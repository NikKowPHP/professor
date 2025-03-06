import { QuoteItem } from "@/domain/models/models"

export interface IQuoteSectionRepository {
  getQuoteSection: () => Promise<QuoteItem | null>
  updateQuoteSection: (id: string, quoteSection: Partial<QuoteItem>) => Promise<QuoteItem>
}


import { YoutubeItem } from "@/domain/models/models"

export interface IYoutubeSectionRepository {
  getYoutubeSection: () => Promise<YoutubeItem | null>
  updateYoutubeSection: (youtubeSection: Partial<YoutubeItem>) => Promise<YoutubeItem>
}


import { BlogPost } from "@/domain/models/models"

export interface IBlogPostRepository {
  getBlogPosts: ( ) => Promise<BlogPost[]>
  getBlogPostBySlug: (slug: string) => Promise<BlogPost | null>
  createBlogPost: (blogPost: Omit<BlogPost, 'id'>) => Promise<BlogPost>
  updateBlogPost: (id: string, blogPost: Partial<BlogPost>) => Promise<BlogPost | null>
  deleteBlogPost: (id: string) => Promise<boolean>
  getBlogPostById: (id: string) => Promise<BlogPost | null>
}