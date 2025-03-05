import { useState, useCallback } from 'react';
import { BlogPost } from '@/domain/models/blog-post.model';
import { useApi } from '@/hooks/use-api';

export const useAdminBlogPosts = () => {
  const { fetchApi } = useApi();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const getBlogPosts = useCallback(async () => {
    return fetchApi<BlogPost[]>({
      url: '/api/admin/blog-posts',
      method: 'GET',
      onSuccess: setBlogPosts,
      errorMessage: 'Failed to fetch blog posts'
    });
  }, [fetchApi]);

  const getBlogPostById = useCallback(async (id: string) => {
    return fetchApi<BlogPost>({
      url: `/api/admin/blog-post?id=${id}`,
      method: 'GET',
      onSuccess: (post) => {
        return post
        
      },
      errorMessage: 'Failed to fetch blog post'
    });
  }, [fetchApi]);

  const createBlogPost = useCallback(async (data: Partial<BlogPost>) => {

    const payload = { data: data };
    return fetchApi<BlogPost>({
      url: '/api/admin/blog-post',
      method: 'POST',
      data:payload,
      onSuccess: (newPost) => setBlogPosts(prev => [...prev, newPost]),
      errorMessage: 'Failed to create blog post'
    });
  }, [fetchApi]);

  const updateBlogPost = useCallback(async (id: string, data: Partial<BlogPost>) => {
    // Validate required fields
    if (!data.title || !data.content_html) {
      throw new Error('Title and content are required');
    }

    // Structure the payload explicitly
    // const payload = {
    //   data: {
    //     title: data.title,
    //     slug: data.slug,
    //     tag: data.tag,
    //     image_url: data.image_url,
    //     image_alt: data.image_alt,
    //     excerpt: data.excerpt,
    //     content_html: data.content_html,
    //     is_pinned: data.is_pinned
    //   }
    // };
    const payload = { data: data };

    return fetchApi<BlogPost>({
      url: `/api/admin/blog-post?id=${id}`,
      method: 'PUT',
      data: payload ,
      onSuccess: (updatedPost) => setBlogPosts(prev => 
        prev.map(post => post.id === id ? updatedPost : post)
      ),
      errorMessage: 'Failed to update blog post'
    });
  }, [fetchApi]);

  const deleteBlogPost = useCallback(async (id: string) => {
    return fetchApi<void>({
      url: `/api/admin/blog-post?id=${id}`,
      method: 'DELETE',
      onSuccess: () => setBlogPosts(prev => prev.filter(post => post.id !== id)),
      errorMessage: 'Failed to delete blog post'
    });
  }, [fetchApi]);

  return {
    blogPosts,
    getBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPostById
  };
};