import { MetadataRoute } from 'next'
import { blogPostService } from '@/lib/services/blog-post.service'
import { siteUrl } from '@/config/constants';
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;



  // Get all blog posts for each locale
  const posts = await blogPostService.getBlogPosts()
  const blogUrls = posts.map(post => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.created_at,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.7,
  }))

  // Flatten the blog URLs array
  const flattenedBlogUrls = blogUrls.flat()




  return [
    ...flattenedBlogUrls,
  ]
}