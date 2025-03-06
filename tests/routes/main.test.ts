import { NextRequest } from 'next/server';
import { GET as QUOTE_GET, PUT as QUOTE_PUT } from '@/app/api/quote/route';
import { GET as YOUTUBE_GET, PUT as YOUTUBE_PUT } from '@/app/api/youtube/route';
import { 
  GET as BLOG_POST_GET, 
  POST as BLOG_POST_POST, 
  PUT as BLOG_POST_PUT, 
  DELETE as BLOG_POST_DELETE 
} from '@/app/api/admin/blog-post/route';
import { GET as BLOG_POSTS_GET } from '@/app/api/admin/blog-posts/route';


// Replace the current supabase mock with a chainable queryBuilder.
// Move the queryBuilder declaration inside the factory callback to avoid referencing out-of-scope variables.
jest.mock('@/lib/supabase', () => {
  const queryBuilder = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn(), // we will override this in each test.
    insert: jest.fn(),
    // Make our chain thenable by defining a then function.
    then: function (resolve: (value: unknown) => void) {
      return resolve(this);
    },
  };

  return {
    supabase: {
      from: jest.fn(() => queryBuilder),
      // Expose the query builder so that tests can override its methods:
      __queryBuilder: queryBuilder,
    },
  };
});

jest.mock('@/lib/services/quote-section.service', () => ({
  quoteSectionService: {
    getQuoteSection: jest.fn(),
    updateQuoteSection: jest.fn()
  }
}));

// Mock youtube section service
jest.mock('@/lib/services/youtube-section.service', () => ({
  youtubeSectionService: {
    getYoutubeSection: jest.fn(),
    updateYoutubeSection: jest.fn()
  }
}));

// Mock blog post service
jest.mock('@/lib/services/blog-post.service', () => ({
  blogPostService: {
    getBlogPostById: jest.fn(),
    createBlogPost: jest.fn().mockImplementation(async (data) => ({
      id: 'new-id',
      ...data,
      created_at: new Date().toISOString()
    })),
    updateBlogPost: jest.fn(),
    deleteBlogPost: jest.fn(),
    getBlogPosts: jest.fn(),
    getBlogPostBySlug: jest.fn()
  }
}));
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn()
}));



describe('Quote API', () => {
  const { quoteSectionService } = require('@/lib/services/quote-section.service');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET should return 404 when no quote section exists', async () => {
    quoteSectionService.getQuoteSection.mockResolvedValue(null);
    
    const res = await QUOTE_GET();
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.message).toBe('Quote section not found');
  });

  test('GET should return quote section with cache headers', async () => {
    const mockData = { content: 'Test quote' };
    quoteSectionService.getQuoteSection.mockResolvedValue(mockData);
    
    const res = await QUOTE_GET();
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toMatch(/no-store/);
    const data = await res.json();
    expect(data).toEqual(mockData);
  });

  test('PUT should require ID field', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'PUT',
      body: JSON.stringify({ content: 'New quote' })
    });
    
    const res = await QUOTE_PUT(req);
    expect(res.status).toBe(400);
  });

  test('PUT should handle update errors', async () => {
    quoteSectionService.updateQuoteSection.mockRejectedValue(new Error('DB error'));
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'PUT',
      body: JSON.stringify({ id: '1', content: 'New quote' })
    });
    
    const res = await QUOTE_PUT(req);
    expect(res.status).toBe(500);
  });
});

describe('YouTube API', () => {
  const { youtubeSectionService } = require('@/lib/services/youtube-section.service');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET should return youtube section data', async () => {
    const mockData = { videoId: 'abc123' };
    youtubeSectionService.getYoutubeSection.mockResolvedValue(mockData);
    
    const res = await YOUTUBE_GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockData);
  });

  test('PUT should validate request body', async () => {
    const req = new NextRequest('http://localhost/api/youtube', {
      method: 'PUT',
      body: JSON.stringify({}) // Missing required fields
    });
    
    const res = await YOUTUBE_PUT(req);
    expect(res.status).toBe(500);
  });

  test('PUT should revalidate cache', async () => {
    const { revalidateTag } = require('next/cache');
    const mockData = { videoId: 'updated123' };
    youtubeSectionService.updateYoutubeSection.mockResolvedValue(mockData);
    
    const req = new NextRequest('http://localhost/api/youtube', {
      method: 'PUT',
      body: JSON.stringify({ videoId: 'updated123' })
    });
    
    await YOUTUBE_PUT(req);
    expect(revalidateTag).toHaveBeenCalledWith(expect.stringContaining('youtube'));
  });
});

describe('Blog Post API', () => {
  const { blogPostService } = require('@/lib/services/blog-post.service');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST should create new blog post', async () => {
    const mockData = { title: 'New Post' };
    const req = new NextRequest('http://localhost/api/admin/blog-post', {
      method: 'POST',
      body: JSON.stringify({ data: mockData, locale: 'en' })
    });
    
    const res = await BLOG_POST_POST(req);
    expect(res.status).toBe(200);
    const responseData = await res.json();
    expect(responseData).toMatchObject({
      id: expect.any(String),
      ...mockData
    });
  });

  test('GET should require ID parameter', async () => {
    const req = new NextRequest('http://localhost/api/admin/blog-post');
    const res = await BLOG_POST_GET(req);
    expect(res.status).toBe(400);
  });

  test('PUT should validate request body', async () => {
    const req = new NextRequest('http://localhost/api/admin/blog-post', {
      method: 'PUT',
      body: JSON.stringify({}) // Missing data
    });
    
    const res = await BLOG_POST_PUT(req);
    expect(res.status).toBe(400);
  });

  test('DELETE should handle not found errors', async () => {
    blogPostService.deleteBlogPost.mockResolvedValue(null);
    const req = new NextRequest('http://localhost/api/admin/blog-post?id=999', {
      method: 'DELETE'
    });
    
    const res = await BLOG_POST_DELETE(req);
    expect(res.status).toBe(404);
  });
});

describe('Blog Posts API', () => {
  const { blogPostService } = require('@/lib/services/blog-post.service');

  test('GET should return all blog posts', async () => {
    const mockPosts = [{ id: '1' }, { id: '2' }];
    blogPostService.getBlogPosts.mockResolvedValue(mockPosts);
    
    const res = await BLOG_POSTS_GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.length).toBe(2);
  });
});