'use client'

import { useRouter } from 'next/navigation'
import { BlogPostForm } from '../../components/blog-post-form'
import { useEffect, useState } from 'react'
import { BlogPost } from '@/domain/models/blog-post.model'
import logger from '@/lib/logger'
import { useAdmin } from '@/contexts/admin-context'
import { LoadingSpinner } from '@/components/ui/loadingSpinner'

interface Props {
  params: { id: string }
}

export default function EditBlogPostPage({params}: Props) {
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [id, setId] = useState<string>('')
  const { updateBlogPost, getBlogPostById, createBlogPost, loading} = useAdmin()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const { id } = params;
        if (id) {
          setId(id);
          const post = await getBlogPostById(id);
          setBlogPost(post || null);
        }
      } catch (error) {
        logger.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [params]);

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
 
 

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!blogPost) {
    return <div className="p-4 text-red-600">Blog post not found</div>;
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