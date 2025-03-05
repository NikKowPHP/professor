import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { BlogPost } from '@/domain/models/blog-post.model'
import { IBlogPostRepository } from '@/lib/interfaces/blog-post.interface'
import logger from '@/lib/logger'
import { unstable_cache } from 'next/cache'
import { CACHE_TAGS, CACHE_TIMES } from '@/lib/utils/cache'

export class BlogPostRepository implements IBlogPostRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'proffessor_news'

  constructor() {
    this.supabaseClient = supabase
  }

  getBlogPosts = async ( ): Promise<BlogPost[]> => {
    const cachedData = await unstable_cache(
      async () => {
        const { data, error } = await this.supabaseClient
          .from(this.tableName)
          .select('*')
          .order('created_at', { ascending: false })
          .throwOnError()

        if (error) throw error
        return data
      },
      ['blog-posts-list'],
      { tags: [CACHE_TAGS.BLOG_POSTS],  revalidate: CACHE_TIMES.MINUTE }
    )()
    
    return cachedData
  }

  getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const cachedData = await unstable_cache(
      async () => {
        const { data, error } = await this.supabaseClient
          .from(this.tableName)
          .select('*')
          .eq('slug', slug)
          .maybeSingle()

        if (error) throw error
        return data
      },
      [`blog-post-slug-${slug}`],
      { 
        tags: [CACHE_TAGS.BLOG_POSTS, `blog-post-slug-${slug}`],
        revalidate: CACHE_TIMES.MINUTE 
      }
    )()
    
    return cachedData
  }

  createBlogPost = async (
    blogPost: Omit<BlogPost, 'id'>,
     
  ): Promise<BlogPost> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .insert(blogPost)
      .select()
      .single()

    if (error) {
      logger.error('Error creating blog post:', error)
      throw new Error('Failed to create blog post')
    }

    return data
  }

  updateBlogPost = async (
    id: string,
    blogPost: Partial<BlogPost>,
     
  ): Promise<BlogPost | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update(blogPost)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      logger.error('Error updating blog post:', error)
      throw new Error('Failed to update blog post')
    }

    if (!data) {
      throw new Error('Failed to update blog post')
    }

    return data
  }

  getBlogPostById = async (id: string,  ): Promise<BlogPost | null> => {
    const cachedData = await unstable_cache(
      async () => {
        const { data, error } = await this.supabaseClient
          .from(this.tableName)
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        return data
      },
      [`blog-post-${id}`],
      { tags: [CACHE_TAGS.BLOG_POSTS] ,  revalidate: CACHE_TIMES.MINUTE}
    )()
    
    return cachedData
  }

  deleteBlogPost = async (id: string,  ): Promise<boolean> => {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', id)

    if (error) {
      logger.error('Error deleting blog post:', error)
      throw new Error('Failed to delete blog post')
    }

    return true
  }
}

// export singleton
export const blogPostRepository = new BlogPostRepository()