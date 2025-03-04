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

      if (error) {
        logger.log('Error fetching blog posts:', error)
        return []
      }

    return data
  }

  getBlogPostBySlug = async (slug: string,  ): Promise<BlogPost | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      logger.log('Error fetching blog post by slug:', error)
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
      .insert([
        {
          title: blogPost.title,
          slug: blogPost.slug,
          image_url: blogPost.image_url,
          image_alt: blogPost.image_alt,
          excerpt: blogPost.excerpt,
          content_html: blogPost.content_html,
          is_pinned: blogPost.is_pinned || false,
          created_at: blogPost.created_at,
        },
      ])
      .select()
      .single()

    if (error) {
      logger.log('Error creating blog post:', error)
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
      .update({
        title: blogPost.title,
        slug: blogPost.slug,
        image_url: blogPost.image_url,
        image_alt: blogPost.image_alt,
        excerpt: blogPost.excerpt,
        content_html: blogPost.content_html,
        is_pinned: blogPost.is_pinned,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      logger.log('Error updating blog post:', error)
      return null
    }

    if (!data) {
      return null
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
      logger.log('Error fetching blog post by id:', error)
      return null
    }

    if (!data) {
      return null
    }

    return data
  }

  deleteBlogPost = async (id: string,  ): Promise<boolean> => {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', id)

    if (error) {
      logger.log('Error deleting blog post:', error)
      return false
    }

    return true
  }
}

// export singleton
export const blogPostRepository = new BlogPostRepository()