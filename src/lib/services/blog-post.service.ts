import { BlogPost } from "@/domain/models/blog-post.model"
import { blogPostRepositoryLocal } from "@/lib/repositories/blog-post.local.repository"
import { blogPostRepository } from "@/lib/repositories/blog-post.repository"

export interface IBlogPostService {
  getBlogPosts(): Promise<BlogPost[]>
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>
  createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost>
  updateBlogPost(id: string, blogPost: Partial<BlogPost>): Promise<BlogPost | null>
  deleteBlogPost(id: string): Promise<boolean>
}

export class BlogPostService implements IBlogPostService {
  private blogPostRepository: any //IBlogPostRepository
  constructor() {
    if(process.env.MOCK_REPOSITORIES === 'true') {
      this.blogPostRepository = blogPostRepositoryLocal
    } else {
      this.blogPostRepository = blogPostRepository // TODO: implement postgres repo
    }
  }

  getBlogPosts = async (): Promise<BlogPost[]> => {
    return this.blogPostRepository.getBlogPosts('en')
  }

  getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.getBlogPostBySlug(slug, 'en')
  }

  getBlogPostById = async (id: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.getBlogPostById(id)
  }

  createBlogPost = async (blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    blogPost.createdAt = new Date().toISOString()
    const trimmedBlogPost = this.trimBlogPost(blogPost)
    return this.blogPostRepository.createBlogPost(trimmedBlogPost)
  }

  updateBlogPost = async (id: string, blogPost: Partial<BlogPost>): Promise<BlogPost | null> => {
    const trimmedBlogPost = this.trimBlogPost(blogPost)

    return this.blogPostRepository.updateBlogPost(id, trimmedBlogPost)
  }

  deleteBlogPost = async (id: string): Promise<boolean> => {
    return this.blogPostRepository.deleteBlogPost(id)
  }
  private trimBlogPost = (blogPost: Partial<BlogPost>): Partial<BlogPost> => {
    return  Object.fromEntries(
      Object.entries(blogPost)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    );
  }
}

// export singleton
export const blogPostService = new BlogPostService()

export const getBlogPostService = async () => {
  return new BlogPostService()
}