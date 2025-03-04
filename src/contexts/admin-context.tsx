'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'
import { QuoteItem } from '@/lib/data/quote-section'
import { YoutubeItem } from '@/lib/data/youtube-section'

interface AdminContextType {
  blogPosts: Record<string, BlogPost[]>
  loading: boolean
  error: string | null
 


  createBlogPost: (data: Partial<BlogPost>) => Promise<void>
  updateBlogPost: (
    id: string,
    data: Partial<BlogPost>,
  ) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>
  pinBlogPost: (id: string) => Promise<void>


  clearError: () => void
  getBlogPost: (id: string,  ) => Promise<BlogPost | null>
  getBlogPosts: () => Promise<void>

  // Quote Section
  quote: QuoteItem | null;
  getQuote: () => Promise<void>;
  updateQuote: (data: Partial<QuoteItem>) => Promise<void>;

  // Youtube Section
  youtube: YoutubeItem | null;
  getYoutube: () => Promise<void>;
  updateYoutube: (data: Partial<YoutubeItem>) => Promise<void>;
}

interface AdminProviderProps {
  children: React.ReactNode
  initialBlogPosts?: Record<string, BlogPost[]>
  initialQuote?: QuoteItem | null
  initialYoutube?: YoutubeItem | null
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({
  children,
  initialBlogPosts,
  initialQuote,
  initialYoutube,
}: AdminProviderProps) {

  const [blogPosts, setBlogPosts] = useState<Record<string, BlogPost[]>>(
    initialBlogPosts || { en: [] }
  )
  const [quote, setQuote] = useState<QuoteItem | null>(initialQuote || null)
  const [youtube, setYoutube] = useState<YoutubeItem | null>(initialYoutube || null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize case studies when initialCaseStudies changes


  useEffect(() => {
    if (initialBlogPosts) {
      setBlogPosts(initialBlogPosts)
    }
  }, [initialBlogPosts])

  
  useEffect(() => {
    if (initialQuote) {
      setQuote(initialQuote)
    }
  }, [initialQuote])

  useEffect(() => {
    if (initialYoutube) {
      setYoutube(initialYoutube)
    }
  }, [initialYoutube])



  const createBlogPost = async (data: Partial<BlogPost> ) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/blog-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      })

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Failed to create blog post' }))
        throw new Error(errorData.error || 'Failed to create blog post')
      }

      const newBlogPost = await response.json()
      setBlogPosts((prev) => ({
        ...prev,
        ['en']: [...prev['en'], newBlogPost],
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create blog post'
      )
      logger.error(`Failed to create blog post ${err}`)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateBlogPost = async (
    id: string,
    data: Partial<BlogPost>,
  ) => {
    setLoading(true)
    setError(null)
    try {
      console.log('updateBlogPost', {data})
      const response = await fetch(`/api/admin/blog-post?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update blog post')
      }

      const updatedBlogPost = await response.json()
      setBlogPosts((prev) => ({
        ...prev,
        ['en']: prev['en'].map((bp) =>
          bp.id === id ? updatedBlogPost : bp
        ),
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update blog post'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteBlogPost = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      console.log('perfoming delete', id)
      const response = await fetch(`/api/admin/blog-post?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete blog post')
      }

      setBlogPosts((prev) => ({
        ...prev,
        ['en']: prev['en'].filter((cs) => cs.id !== id),
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete blog post'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }

  const pinBlogPost = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/blog-post/pin?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to pin blog post')
      }

      const updatedBlogPost = await response.json()
      setBlogPosts((prev) => ({
        ...prev,
        ['en']: prev['en'].map((bp) =>
          bp.id === id ? updatedBlogPost : bp
        ),
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to pin blog post'
      )
      throw err
    } finally {
      setLoading(false)
    }
  }

  

  const clearError = () => setError(null)

  

  const getBlogPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/blog-posts`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts')
      }
      const data = await response.json()
      setBlogPosts((prev) => ({ ...prev, ['en']: data }))
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }, [])

  const getBlogPost = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/blog-post?id=${id}`)
      const data = await response.json()
      return data
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blog post')
    } finally {
      setLoading(false)
    }
  }

  // Quote Section
  const getQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quote');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (data: Partial<QuoteItem>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update quote');
      }
      const updatedQuote = await response.json();
      setQuote(updatedQuote);
    } catch (error: any) {
      setError(error.message || 'Failed to update quote');
    } finally {
      setLoading(false);
    }
  };

  // Youtube Section
  const getYoutube = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/youtube');
      if (!response.ok) {
        throw new Error('Failed to fetch youtube');
      }
      const data = await response.json();
      setYoutube(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch youtube');
    } finally {
      setLoading(false);
    }
  };

  const updateYoutube = async (data: Partial<YoutubeItem>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/youtube', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update youtube');
      }
      const updatedYoutube = await response.json();
      setYoutube(updatedYoutube);
    } catch (error: any) {
      setError(error.message || 'Failed to update youtube');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        blogPosts,
        loading,
        error,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,
        pinBlogPost,
        clearError,
        getBlogPosts,
        getBlogPost,
        quote,
        getQuote,
        updateQuote,
        youtube,
        getYoutube,
        updateYoutube,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
