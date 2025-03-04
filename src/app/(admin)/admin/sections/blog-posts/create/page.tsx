'use client'

import { useRouter } from 'next/navigation'
import { BlogPostForm } from '../components/blog-post-form'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'
import { useState } from 'react'
import { useAdmin } from '@/contexts/admin-context'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { createBlogPost, updateBlogPost } = useAdmin()
  const onCreate = async (data: Partial<BlogPost>) => {
    setLoading(true)
    try {
      await createBlogPost(data as Omit<BlogPost, 'id'>)
      router.push('/admin/sections/blog-posts')
    } catch (error) {
      logger.log('Failed to create blog post:', error)
    } finally {
      setLoading(false)
    }
  }


  const onUpdate = async (data: Partial<BlogPost>) => {
    setLoading(true)
    try {
      if (data.id) {
        await updateBlogPost(data.id, data)
      }
    } catch (error) {
      console.error('Failed to update quote section:', error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <h1>New Blog Post</h1>


      <BlogPostForm
        onSubmit={onCreate}
        onUpdate={onUpdate}
        onCancel={() => router.push('/admin/sections/blog-posts')}
        loading={loading}
      />
    </div>
  )
}