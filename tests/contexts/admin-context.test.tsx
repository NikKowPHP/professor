import React, { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useAdmin, AdminProvider } from '@/contexts/admin-context';
import { useApi } from '@/hooks/use-api';
import { useAdminBlogPosts } from '@/hooks/use-admin-blogposts';
import { BlogPost } from '@/domain/models/blog-post.model';
import { blogPosts } from '@/lib/data/blog-posts.mock.data';
import { ReactNode } from 'react';

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

// Error provider mock
// const mockShowError = jest.fn();
// jest.mock('@/hooks/use-error', () => ({
//   useError: () => ({ showError: mockShowError }),
//   ErrorProvider: ({ children }: { children: React.ReactNode }) => children,
// }));

// Unified wrapper with all providers
const wrapper = ({ children }: { children: ReactNode }) => (
    <AdminProvider>{children}</AdminProvider>
);

describe('AdminContext', () => {
  const mockBlogPost: BlogPost = blogPosts[0];

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
      error: null
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
});