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
      expect(result).toEqual(mockUpdatedPost);
    });

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

