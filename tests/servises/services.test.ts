import { blogPostService } from '@/lib/services/blog-post.service';
import { blogPostRepository } from '@/lib/repositories/blog-post.repository';
import { blogPosts } from '@/lib/data/mocks/blog-posts.mock.data';
import { BlogPost, YoutubeItem, QuoteItem  } from '@/domain/models/models';
import { getMockYoutubeItem } from '@/lib/data/mocks/youtube-item.mock';
import { youtubeSectionRepository } from '@/lib/repositories/youtube.repository';
import { youtubeSectionService } from '@/lib/services/youtube-section.service';

import { quoteSectionService } from '@/lib/services/quote-section.service';
import { quoteSectionRepository } from '@/lib/repositories/quote.repository';
import {  getMockQuoteItem } from '@/lib/data/mocks/quote-item.mock';

jest.mock('@/lib/repositories/quote.repository');
jest.mock('@/lib/repositories/blog-post.repository');

jest.mock('@/lib/repositories/youtube.repository');
jest.mock('@/lib/supabase', () => {
  const queryBuilder = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn(), 
    insert: jest.fn(),
    then: function (resolve: (value: unknown) => void) {
      return resolve(this);
    },
  };

  return {
    supabase: {
      from: jest.fn(() => queryBuilder),
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

  describe('getBlogPosts', () => {
    it('should retrieve all blog posts', async () => {
      const mockPosts = [mockBlogPost];
      (blogPostRepository.getBlogPosts as jest.Mock).mockResolvedValue(mockPosts);

      const result = await blogPostService.getBlogPosts();
      
      expect(blogPostRepository.getBlogPosts).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });

    it('should return empty array when no posts exist', async () => {
      (blogPostRepository.getBlogPosts as jest.Mock).mockResolvedValue([]);

      const result = await blogPostService.getBlogPosts();
      expect(result).toEqual([]);
    });
  });

  describe('updateBlogPost', () => {
    it('should update an existing blog post', async () => {
      const updatedData = { title: 'Updated Title' };
      const mockUpdatedPost = { ...mockBlogPost, ...updatedData };
      
      (blogPostRepository.updateBlogPost as jest.Mock).mockResolvedValue(mockUpdatedPost);

      const result = await blogPostService.updateBlogPost('1', updatedData);
      
      expect(blogPostRepository.updateBlogPost).toHaveBeenCalledWith('1', updatedData);
      expect(result).toEqual(mockUpdatedPost); });

    it('should handle non-existent post updates', async () => {
      (blogPostRepository.updateBlogPost as jest.Mock).mockResolvedValue(null);

      const result = await blogPostService.updateBlogPost('999', { title: 'New Title' });
      expect(result).toBeNull();
    });
  });

  describe('deleteBlogPost', () => {
    it('should successfully delete a blog post', async () => {
      (blogPostRepository.deleteBlogPost as jest.Mock).mockResolvedValue(true);

      const result = await blogPostService.deleteBlogPost('1');
      expect(result).toBe(true);
      expect(blogPostRepository.deleteBlogPost).toHaveBeenCalledWith('1');
    });

    it('should return false when deletion fails', async () => {
      (blogPostRepository.deleteBlogPost as jest.Mock).mockResolvedValue(false);

      const result = await blogPostService.deleteBlogPost('999');
      expect(result).toBe(false);
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should retrieve post by slug', async () => {
      (blogPostRepository.getBlogPostBySlug as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await blogPostService.getBlogPostBySlug('test-post');
      expect(blogPostRepository.getBlogPostBySlug).toHaveBeenCalledWith('test-post');
      expect(result).toEqual(mockBlogPost);
    });

    it('should return null for non-existent slug', async () => {
      (blogPostRepository.getBlogPostBySlug as jest.Mock).mockResolvedValue(null);

      const result = await blogPostService.getBlogPostBySlug('non-existent');
      expect(result).toBeNull();
    });
  });

});



describe('YoutubeSectionService', () => {
  const mockYoutubeItem: YoutubeItem = getMockYoutubeItem()

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getYoutubeSection', () => {
    it('should retrieve youtube section data', async () => {
      (youtubeSectionRepository.getYoutubeSection as jest.Mock).mockResolvedValue(mockYoutubeItem);

      const result = await youtubeSectionService.getYoutubeSection();
      
      expect(youtubeSectionRepository.getYoutubeSection).toHaveBeenCalled();
      expect(result).toEqual(mockYoutubeItem);
    });

    it('should return null when no data exists', async () => {
      (youtubeSectionRepository.getYoutubeSection as jest.Mock).mockResolvedValue(null);

      const result = await youtubeSectionService.getYoutubeSection();
      expect(result).toBeNull();
    });
  });

  describe('updateYoutubeSection', () => {
    it('should update youtube section with partial data', async () => {
      const updateData = { youtube_url: 'new123' };
      const mockUpdated = { ...mockYoutubeItem, ...updateData };
      
      (youtubeSectionRepository.updateYoutubeSection as jest.Mock).mockResolvedValue(mockUpdated);

      const result = await youtubeSectionService.updateYoutubeSection(updateData);
      
      expect(youtubeSectionRepository.updateYoutubeSection).toHaveBeenCalledWith(updateData);
      expect(result).toEqual(mockUpdated);
    });

    it('should handle repository errors', async () => {
      const mockError = new Error('Update failed');
      (youtubeSectionRepository.updateYoutubeSection as jest.Mock).mockRejectedValue(mockError);

      await expect(youtubeSectionService.updateYoutubeSection({}))
        .rejects
        .toThrow('Update failed');
    });
  });
});

describe('QuoteSectionService', () => {
  const mockQuote: QuoteItem =  getMockQuoteItem()

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuoteSection', () => {
    it('should retrieve quote section data', async () => {
      (quoteSectionRepository.getQuoteSection as jest.Mock).mockResolvedValue(mockQuote);

      const result = await quoteSectionService.getQuoteSection();
      
      expect(quoteSectionRepository.getQuoteSection).toHaveBeenCalled();
      expect(result).toEqual(mockQuote);
    });

    it('should return null when no data exists', async () => {
      (quoteSectionRepository.getQuoteSection as jest.Mock).mockResolvedValue(null);

      const result = await quoteSectionService.getQuoteSection();
      expect(result).toBeNull();
    });
  });

  describe('updateQuoteSection', () => {
    it('should update quote section with valid ID', async () => {
      const updateData = { quote: 'Updated Quote' };
      const mockUpdated = { ...mockQuote, ...updateData };
      
      (quoteSectionRepository.updateQuoteSection as jest.Mock).mockResolvedValue(mockUpdated);

      const result = await quoteSectionService.updateQuoteSection('1', updateData);
      
      expect(quoteSectionRepository.updateQuoteSection).toHaveBeenCalledWith('1', updateData);
      expect(result).toEqual(mockUpdated);
    });

    it('should handle non-existent ID updates', async () => {
      (quoteSectionRepository.updateQuoteSection as jest.Mock).mockResolvedValue(null);

      const result = await quoteSectionService.updateQuoteSection('999', {});
      expect(result).toBeNull();
    });
  });
});