'use client'

import { useState } from 'react'
import { BlogPost } from '@/domain/models/blog-post.model'
import { blogPostService } from '@/lib/services/blog-post.service'
import { BlogPostList } from '../blog-posts-list'

interface BlogPostsClientWrapperProps {
  blogPosts: BlogPost[]
}

export function BlogPostsClientWrapper({ blogPosts }: BlogPostsClientWrapperProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDelete = async (id: string) => {
    setLoading(true)
    try {
        await blogPostService.deleteBlogPost(id)
    } catch (error) {
      setError('Failed to delete blog post')
    } finally {
      setLoading(false)
    }
  }


  const onUpdate = async (id: string, data: Partial<BlogPost>) => {
    setLoading(true)
    try {
      await blogPostService.updateBlogPost(id, data)
    } catch (error) {
      setError('Failed to update blog post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BlogPostList
      error={error}
      onDelete={onDelete}
      onUpdate={onUpdate}
      loading={loading}
      blogPosts={blogPosts || undefined}
    />
  )

}