import React, { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useAdmin, AdminProvider } from '@/contexts/admin-context';
import { useApi } from '@/hooks/use-api';
import { useAdminBlogPosts } from '@/hooks/use-admin-blogposts';
import { BlogPost } from '@/domain/models/models';
import { blogPosts } from '@/lib/data/mocks/blog-posts.mock.data';
import { ReactNode } from 'react';
import { QuoteItem, YoutubeItem } from '@/domain/models/models';
import { getMockQuoteItem } from '@/lib/data/mocks/quote-item.mock';
import { getMockYoutubeItem } from '@/lib/data/mocks/youtube-item.mock';

// Mock dependencies
jest.mock('@/hooks/use-api');
jest.mock('@/hooks/use-admin-blogposts');
jest.mock('@supabase/supabase-js');

const mockUseApi = useApi as jest.MockedFunction<typeof useApi>;
const mockUseAdminBlogPosts = useAdminBlogPosts as jest.MockedFunction<typeof useAdminBlogPosts>;

// Supabase mock setup
const mockAuth = {
  signInWithPassword: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
  signOut: jest.fn().mockResolvedValue({ error: null }),
};

const mockSupabase = {
  auth: mockAuth,
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  })),
};

require('@supabase/supabase-js').createClient = jest.fn(() => mockSupabase);

beforeAll(() => {
  global.URL.createObjectURL = jest.fn().mockReturnValue('mocked-url');
  global.URL.revokeObjectURL = jest.fn();
});



// Unified wrapper with all providers
const wrapper = ({ children }: { children: ReactNode }) => (
    <AdminProvider>{children}</AdminProvider>
);

describe('AdminContext', () => {
  const mockBlogPost: BlogPost = blogPosts[0];
  const mockQuote: QuoteItem =  getMockQuoteItem()
  const mockYoutube: YoutubeItem =  getMockYoutubeItem()

  beforeEach(() => {
    // Mock API setup
    mockUseApi.mockReturnValue({
      fetchApi: jest.fn().mockResolvedValue(mockBlogPost),
      loading: false,
      error: null,
      setError: jest.fn(),
    });

    // Mock blog posts hook
    mockUseAdminBlogPosts.mockReturnValue({
      blogPosts: [mockBlogPost],
      getBlogPosts: jest.fn().mockResolvedValue([mockBlogPost]),
      createBlogPost: jest.fn().mockResolvedValue(mockBlogPost),
      updateBlogPost: jest.fn().mockResolvedValue(mockBlogPost),
      deleteBlogPost: jest.fn().mockResolvedValue(true),
      getBlogPostById: jest.fn().mockResolvedValue(mockBlogPost)
    });

    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('provides initial admin context', () => {
    const { result } = renderHook(() => useAdmin(), { wrapper });
    expect(result.current).toEqual(expect.objectContaining({
      blogPosts: [mockBlogPost],
      loading: false,
      error: null,
      quote: null,
      youtube: null
    }));
  });

  // Enhanced createBlogPost test with error handling
  describe('createBlogPost', () => {
    it('should handle permission errors', async () => {
      const error = new Error('Unauthorized');
      mockUseAdminBlogPosts.mockReturnValueOnce({
        ...mockUseAdminBlogPosts(),
        createBlogPost: jest.fn().mockRejectedValue(error)
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await expect(result.current.createBlogPost({} as any))
          .rejects.toThrow('Unauthorized');
      });
    });
  });

  // Enhanced update test with validation
  describe('updateBlogPost', () => {
   
    it('should validate required fields', async () => {
      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await expect(result.current.updateBlogPost('1', { title: '' }))
          .rejects.toThrow('Title and content are required');
      });
    });
  });

  // Enhanced delete test with error simulation
  describe('deleteBlogPost', () => {
    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      mockUseAdminBlogPosts.mockReturnValueOnce({
        ...mockUseAdminBlogPosts(),
        deleteBlogPost: jest.fn().mockRejectedValue(error)
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await expect(result.current.deleteBlogPost('1'))
          .rejects.toThrow('Deletion failed');
      });
    });
  });

  // Cache revalidation test
  describe('revalidateCache', () => {
    it('should trigger cache revalidation', async () => {
      const { result } = renderHook(() => useAdmin(), { wrapper });
      
      await act(async () => {
        await result.current.revalidateCache();
      });

      expect(mockUseApi().fetchApi).toHaveBeenCalledWith(
        expect.objectContaining({ url: '/api/admin/revalidate' })
      );
    });
  });

  describe('quote section', () => {
    it('should fetch quote data', async () => {
      mockUseApi.mockReturnValueOnce({
        fetchApi: jest.fn().mockResolvedValue(mockQuote),
        loading: false,
        error: null,
        setError: jest.fn(),
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await result.current.getQuote();
      });

      expect(result.current.quote).toEqual(mockQuote);
      expect(mockUseApi().fetchApi).toHaveBeenCalledWith(
        expect.objectContaining({ url: expect.stringMatching(/^\/api\/quote/) })
      );
    });

    it('should handle quote update errors', async () => {
      const error = new Error('Update failed');
      mockUseApi.mockReturnValueOnce({
        fetchApi: jest.fn().mockRejectedValue(error),
        loading: false,
        error: null,
        setError: jest.fn(),
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await expect(result.current.updateQuote({}))
          .rejects.toThrow('Update failed');
      });
    });
  });

  describe('youtube section', () => {
    it('should fetch youtube data', async () => {
      mockUseApi.mockReturnValueOnce({
        fetchApi: jest.fn().mockResolvedValue(mockYoutube),
        loading: false,
        error: null,
        setError: jest.fn(),
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await result.current.getYoutube();
      });

      expect(result.current.youtube).toEqual(mockYoutube);
      expect(mockUseApi().fetchApi).toHaveBeenCalledWith(
        expect.objectContaining({ url: expect.stringMatching(/^\/api\/youtube/) })
      );
    });

    it('should handle youtube update errors', async () => {
      const error = new Error('Update failed');
      mockUseApi.mockReturnValueOnce({
        fetchApi: jest.fn().mockRejectedValue(error),
        loading: false,
        error: null,
        setError: jest.fn(),
      });

      const { result } = renderHook(() => useAdmin(), { wrapper });

      await act(async () => {
        await expect(result.current.updateYoutube({}))
          .rejects.toThrow('Update failed');
      });
    });
  });

  test('clearError resets error state', () => {
    const { result } = renderHook(() => useAdmin(), { wrapper });
    
    act(() => {
      result.current.clearError();
    });

    expect(mockUseApi().setError).toHaveBeenCalledWith(null);
  });
});