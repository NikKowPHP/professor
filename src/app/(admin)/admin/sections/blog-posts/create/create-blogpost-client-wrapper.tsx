// 'use client'

// import { useState } from 'react'
// import { YoutubeItem } from '@/lib/data/youtube-section'
// import { BlogPostForm } from '../components/blog-post-form'
// import { blogPostService } from '@/lib/services/blog-post.service'
// import { BlogPost } from '@/domain/models/blog-post.model'


// interface CreateBlogPostClientWrapperProps {
//   blogPost: BlogPost | null
// }

// export function CreateBlogPostClientWrapper({ blogPost }: CreateBlogPostClientWrapperProps) {
//   const [loading, setLoading] = useState(false)

//     const onSubmit = async (data: Partial<BlogPost>) => {
//     setLoading(true)
//     try {
//       if (blogPost) {
//           await blogPostService.updateBlogPost(data)
//       }
//       console.log('onSubmit', data)
//     } catch (error) {
//       console.error('Failed to update quote section:', error)
//     } finally {
//       setLoading(false)
//     }
//   }



//   return (
//     <YoutubeForm
//       onSubmit={onSubmit}
//       loading={loading}
//       youtubeSection={youtubeSection || undefined}
//     />
//   )
// }