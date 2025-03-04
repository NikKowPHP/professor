'use client'

import { useAdmin } from '@/contexts/admin-context'
import { useRouter } from 'next/navigation'
import { BlogPostForm } from '../components/blog-post-form'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'

export default function NewBlogPostPage() {
  const { createBlogPost, loading } = useAdmin()
  const router = useRouter()

  const handleCreate = async (data: Partial<BlogPost>) => {
    try {
      await createBlogPost(data )
      router.push('/admin/sections/blog-posts')
    } catch (error) {
      logger.log('Failed to create blog post:', error)
    }
  }

  return (
    <div>
      <h1>New Blog Post</h1>


      <BlogPostForm
        onSubmit={handleCreate}
        onCancel={() => router.push('/admin/sections/blog-posts')}
        loading={loading}
      />
    </div>
  )
}