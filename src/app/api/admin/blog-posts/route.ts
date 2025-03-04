import {  NextResponse } from 'next/server'
import { getBlogPostService } from '@/lib/services/blog-post.service'
import logger from '@/lib/logger'
const blogPostService = await getBlogPostService()



export async function GET() {
  try {
    const blogPost = await blogPostService.getBlogPosts()
    if (!blogPost) {
      return NextResponse.json({ error: 'Blogs post not found' }, { status: 404 })
    }
    return NextResponse.json(blogPost)
  } catch (error) {
    logger.error(`Error fetching blog post: ${error}`)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}
