'use client'

import { useRouter } from 'next/navigation'
import { BlogPostForm } from '../components/blog-post-form'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'
import { blogPostService } from '@/lib/services/blog-post.service'
import { useState } from 'react'
export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onCreate = async (data: Partial<BlogPost>) => {
    setLoading(true)
    try {
      await blogPostService.createBlogPost(data as Omit<BlogPost, 'id'>)
      router.push('/admin/sections/blog-posts')
    } catch (error) {
      logger.log('Failed to create blog post:', error)
    } finally {
      setLoading(false)
    }
  }


  // const onCreate = async (data: Partial<BlogPost>) => {
  //   setLoading(true)
  //   try {
  //     if (blogPosts) {
  //       await blogPostService.createBlogPost(data as Omit<BlogPost, 'id'>)
  //     }
  //     console.log('onSubmit', data)
  //   } catch (error) {
  //     console.error('Failed to update quote section:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const onUpdate = async (data: Partial<BlogPost>) => {
    setLoading(true)
    try {
      if (data.id) {
        await blogPostService.updateBlogPost(data.id, data)
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