import { renderHook, act } from '@testing-library/react';
import { usePage, PageProvider } from '@/contexts/page-context';
import { BlogPost, QuoteItem, YoutubeItem } from '@/domain/models/models';
import React, { ReactNode } from 'react';
import { getMockYoutubeItem } from '@/lib/data/mocks/youtube-item.mock';
import { getMockQuoteItem } from '@/lib/data/mocks/quote-item.mock';
import { blogPosts } from '@/lib/data/mocks/blog-posts.mock.data';



jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock global fetch
const mockFetch = jest.fn();

global.fetch = mockFetch as jest.MockedFunction<typeof fetch>;

const wrapper = ({ children }: { children: ReactNode }) => (
  <PageProvider>{children}</PageProvider>
);

describe('PageContext', () => {
  const mockBlogPost: BlogPost = blogPosts[0]

  const mockQuote: QuoteItem = getMockQuoteItem()
  const mockYoutube: YoutubeItem = getMockYoutubeItem()

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  test('provides initial context values', () => {
    (require('next/navigation').usePathname as jest.Mock)
    .mockReturnValue('/admin/blog-posts');
    const { result } = renderHook(() => usePage(), { wrapper });
    
    expect(result.current).toEqual(expect.objectContaining({
      blogPosts: [],
      quote: null,
      youtube: null,
      loading: false,
      error: null,
      isAdminRoute: true
    }));
  });

  describe('getBlogPosts', () => {
    it('should fetch blog posts successfully', async () => {
      (require('next/navigation').usePathname as jest.Mock)
      .mockReturnValue('/admin/blog-posts');
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockBlogPost])
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getBlogPosts();
      });

      expect(result.current.blogPosts).toEqual([mockBlogPost]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle blog posts fetch errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getBlogPosts();
      });

      expect(result.current.error).toBe('Failed to fetch blog posts');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('getBlogPost', () => {
    it('should fetch single blog post successfully', async () => {
 
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBlogPost)
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      let post;
      await act(async () => {
        post = await result.current.getBlogPost('test-post');
      });

      expect(post).toEqual(mockBlogPost);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle single blog post fetch errors', async () => {
      (require('next/navigation').usePathname as jest.Mock)
      .mockReturnValue('/admin');
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getBlogPost('invalid-post');
      });

      expect(result.current.error).toBe('Failed to fetch blog post');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('getQuote', () => {
    it('should fetch quote successfully', async () => {
  
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockQuote)
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getQuote();
      });

      expect(result.current.quote).toEqual(mockQuote);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle quote fetch errors', async () => {
   
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getQuote();
      });

      expect(result.current.error).toBe('Failed to fetch quote');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('getYoutube', () => {
    it('should fetch youtube data successfully', async () => {
    
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockYoutube)
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getYoutube();
      });

      expect(result.current.youtube).toEqual(mockYoutube);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle youtube fetch errors', async () => {
     
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      } as Response);

      const { result } = renderHook(() => usePage(), { wrapper });

      await act(async () => {
        await result.current.getYoutube();
      });

      expect(result.current.error).toBe('Failed to fetch youtube');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('isAdminRoute', () => {
    it('should return true for admin routes', () => {
      (require('next/navigation').usePathname as jest.Mock)
        .mockReturnValue('/admin/dashboard');

      const { result } = renderHook(() => usePage(), { wrapper });
      expect(result.current.isAdminRoute).toBe(true);
    });

    it('should return false for non-admin routes', () => {
      (require('next/navigation').usePathname as jest.Mock)
        .mockReturnValue('/blog');

      const { result } = renderHook(() => usePage(), { wrapper });
      expect(result.current.isAdminRoute).toBe(false);
    });
  });

  test('clearError resets error state', () => {
    const { result } = renderHook(() => usePage(), { wrapper });
    
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});