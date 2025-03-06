import { BlogPost } from "@/domain/models/blog-post.model"
import { blogPostRepositoryLocal } from "@/lib/repositories/blog-post.local.repository"
import { blogPostRepository } from "@/lib/repositories/blog-post.repository"
import { IBlogPostRepository } from "../interfaces/blog-post.interface"
import logger from "../logger"

export interface IBlogPostService {
  getBlogPosts(): Promise<BlogPost[]>
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>
  createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost>
  updateBlogPost(id: string, blogPost: Partial<BlogPost>): Promise<BlogPost | null>
  deleteBlogPost(id: string): Promise<boolean>
  getBlogPostById(id: string): Promise<BlogPost | null>
}

export class BlogPostService implements IBlogPostService {
  private blogPostRepository: IBlogPostRepository
  constructor() {
    if(process.env.MOCK_REPOSITORIES === 'true') {
      this.blogPostRepository = blogPostRepositoryLocal
    } else {
      this.blogPostRepository = blogPostRepository // TODO: implement postgres repo
    }
  }

  getBlogPosts = async (): Promise<BlogPost[]> => {
    return this.blogPostRepository.getBlogPosts()
  }

  getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const blogPost =  this.blogPostRepository.getBlogPostBySlug(slug.trim())
    logger.log('is mocked repos ? ', process.env.MOCK_REPOSITORIES)
    logger.log('blog post by slug in service', blogPost)
    return blogPost;
  }

  getBlogPostById = async (id: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.getBlogPostById(id)
  }

  createBlogPost = async (blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    blogPost.created_at = new Date().toISOString()
    return this.blogPostRepository.createBlogPost(blogPost)
  }

  updateBlogPost = async (id: string, blogPost: Partial<BlogPost>): Promise<BlogPost | null> => {
    return this.blogPostRepository.updateBlogPost(id, blogPost)
  }

  deleteBlogPost = async (id: string): Promise<boolean> => {
    return this.blogPostRepository.deleteBlogPost(id)
  }

}

// export singleton
export const blogPostService = new BlogPostService()
