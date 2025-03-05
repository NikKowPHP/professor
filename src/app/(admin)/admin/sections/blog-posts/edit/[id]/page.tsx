'use client'

import { useRouter } from 'next/navigation'
import { BlogPostForm } from '../../components/blog-post-form'
import { useEffect, useState } from 'react'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'
import { useAdmin } from '@/contexts/admin-context'

interface Props {
  params: { id: string }
}

export default function EditBlogPostPage({params}: Props) {
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [id, setId] = useState<string>('')
  const { updateBlogPost, getBlogPostById, createBlogPost, loading} = useAdmin()

  useEffect(() => {
    const { id } = params
    if (id) {
      setId(id)
    }
  
    getBlogPostById(id).then(post => setBlogPost(post || null))
  }, [params])

  const handleUpdate = async (data: Partial<BlogPost>) => {
    if (!blogPost) return;
    try {
      await updateBlogPost(id, data)
      router.push('/admin/sections/blog-posts')
    } catch (error) {
      logger.log('Failed to update blog post:', error)
    } finally {
    }
  }

  const handleCreate = async (data: Partial<BlogPost>) => {
    try {
      await createBlogPost(data as Omit<BlogPost, 'id'>)
      router.push('/admin/sections/blog-posts')
    } catch (error) {
      logger.log('Failed to create blog post:', error)
    } finally {
    }
  }
  if(loading)

  if(!blogPost) {
    return <div>Blog post not found</div>
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <BlogPostForm
        post={blogPost}
        onUpdate={handleUpdate}
        onSubmit={handleCreate}
        onCancel={() => router.push('/admin/sections/blog-posts')}
        loading={loading}
      />
    </div>
  )
}