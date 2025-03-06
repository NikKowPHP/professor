// import RecordingService from '@/services/recording.service';
// import AIService from '@/services/ai.service';
// import MessageGenerator from '@/services/generators/messageGenerator';
// import MetricsService from '@/services/metrics.service';
// import { mockDeep } from 'jest-mock-extended';
import { blogPostService } from '@/lib/services/blog-post.service';
import { blogPostRepository } from '@/lib/repositories/blog-post.repository';
import { blogPosts } from '@/lib/data/blog-posts.mock.data';
import { BlogPost } from '@/domain/models/blog-post.model';

jest.mock('@/lib/repositories/blog-post.repository');
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

describe('BlogPostService', () => {
  const mockBlogPost: BlogPost = blogPosts[0]

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBlogPost', () => {
    it('should create a new blog post without ID', async () => {
      const postData: BlogPost = mockBlogPost;

      (blogPostRepository.createBlogPost as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await blogPostService.createBlogPost(postData);
      
      expect(blogPostRepository.createBlogPost).toHaveBeenCalledWith(postData);
      expect(result).toEqual(mockBlogPost);
    });

    it('should handle repository errors', async () => {
      const postData: BlogPost = mockBlogPost;
      const mockError = new Error('Database error');
      
      (blogPostRepository.createBlogPost as jest.Mock).mockRejectedValue(mockError);

      await expect(blogPostService.createBlogPost(postData))
        .rejects
        .toThrow('Database error');
    });
  });

  describe('getBlogPostById', () => {
    it('should retrieve a blog post by ID', async () => {
      (blogPostRepository.getBlogPostById as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await blogPostService.getBlogPostById('1');
      
      expect(blogPostRepository.getBlogPostById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockBlogPost);
    });
  });

  // Add similar tests for updateBlogPost, deleteBlogPost, getBlogPosts, etc.
});


