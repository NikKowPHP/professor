'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { BlogPost } from '@/domain/models/blog-post.model'
import { QuoteItem } from '@/lib/data/quote-section'
import { YoutubeItem } from '@/lib/data/youtube-section'
import { usePathname } from 'next/navigation'

interface PageContextType {
  blogPosts: BlogPost[] | null
  loading: boolean
  error: string | null
  clearError: () => void
  getBlogPost: (slug: string) => Promise<void>
  quote: QuoteItem | null;
  youtube: YoutubeItem | null;
  getQuote: () => Promise<void>;
  getYoutube: () => Promise<void>;
  getBlogPosts: () => Promise<void>
  isAdminRoute: boolean;
}

interface PageProviderProps {
  children: React.ReactNode
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({
  children,
}: PageProviderProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [quote, setQuote] = useState<QuoteItem | null>(null)
  const [youtube, setYoutube] = useState<YoutubeItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

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
      setBlogPosts(data)
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }, [])


  const getBlogPost = useCallback(async (slug: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/blog-post?slug=${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }
      return await response.json()
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blog post')
    } finally {
      setLoading(false)
    }
  }, [])

  const getQuote = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/quote`)
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      setQuote(data)
    } catch (error: any) {
      setError(error.message || 'Failed to fetch quote')
    } finally {
      setLoading(false)
    }
    }, [])

  const getYoutube = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/youtube`)
      if (!response.ok) {
        throw new Error('Failed to fetch youtube')
      }
      const data = await response.json()
      setYoutube(data)
    } catch (error: any) {
      setError(error.message || 'Failed to fetch youtube')
    } finally {
      setLoading(false)
    }
    }, [])

  const isAdminRoute = useMemo(() => {
    return pathname.startsWith('/admin')
  }, [pathname])


  return (
    <PageContext.Provider
      value={{
        blogPosts,
        loading,
        error,
        clearError,
        getBlogPost,
        quote,
        youtube,
        getQuote,
        getYoutube,
        isAdminRoute,
        getBlogPosts,

      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePage = () => {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePage must be used within an PageProvider')
  }
  return context
}
