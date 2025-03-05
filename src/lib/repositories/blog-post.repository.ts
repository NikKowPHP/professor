import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { BlogPost } from '@/domain/models/blog-post.model'
import { IBlogPostRepository } from '@/lib/interfaces/blog-post.interface'
import logger from '@/lib/logger'
export class BlogPostRepository implements IBlogPostRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'proffessor_news'

  constructor() {
    this.supabaseClient = supabase
  }

  getBlogPosts = async ( ): Promise<BlogPost[]> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .throwOnError() 

    console.log('data', data)

      if (error) {
        logger.error('Error fetching blog posts:', error)
        throw error 
      }

    return data
  }

  getBlogPostBySlug = async (slug: string ): Promise<BlogPost | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      logger.error('Error fetching blog post by slug:', error)
      return null
    }

    if (!data) {
      return null
    }

    return data
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
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      logger.error('Error fetching blog post by id:', error)
      throw new Error('Failed to fetch blog post by id')
    }

    if (!data) {
      throw new Error('Failed to fetch blog post by id')
    }

    return data
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