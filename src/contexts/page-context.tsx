'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react'
import { Locale } from '@/i18n'
import { BlogPost } from '@/domain/models/blog-post.model'

interface PageContextType {
  blogPost: BlogPost | null
  loading: boolean
  error: string | null
  clearError: () => void
  getBlogPost: (slug: string, locale: Locale) => Promise<void>

}

interface PageProviderProps {
  children: React.ReactNode
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({
  children,
}: PageProviderProps) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


   const clearError = () => setError(null)


  const getBlogPost = useCallback(async (slug: string, locale: Locale) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/blog-post?slug=${slug}&locale=${locale}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }
      const data = await response.json()
      setBlogPost(data)
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blog post')
    } finally {
      setLoading(false)
    }
  }, [])



  return (
    <PageContext.Provider
      value={{
        blogPost,
        loading,
        error,
        clearError,
        getBlogPost,
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
