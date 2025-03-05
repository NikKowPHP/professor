'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import logger from '@/lib/logger'
import { useAdmin } from '@/contexts/admin-context'
import { Button } from '@/components/ui/button/button'


export function BlogPostList() {
  const { blogPosts, error, loading, deleteBlogPost, updateBlogPost } = useAdmin()

  const router = useRouter()
  const [pinnedPostId, setPinnedPostId] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(false)

  useEffect(() => {
    console.log('blogPosts', blogPosts)
  }, [blogPosts])

  useEffect(() => {
    if (blogPosts) {
      const pinnedPost = blogPosts.find((post) => post.is_pinned)
      setPinnedPostId(pinnedPost?.id || null)
    }
  }, [blogPosts])

  useEffect(() => {
    console.log('pinnedPostId', pinnedPostId)
  }, [pinnedPostId])

  const handleDelete = async (id: string) => {
    setLocalLoading(true)
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        debugger
        await deleteBlogPost(id)
      } catch (error) {
        logger.log('Failed to delete blog post:', error)
      }
    }
    setLocalLoading(false)
  }

  const handlePin = async (postId: string) => {
    try {
      // Unpin the currently pinned post if there is one
      console.log('pinnedPostId', pinnedPostId)
      debugger
      if (pinnedPostId) {
        await updateBlogPost(pinnedPostId, { is_pinned: false })
      }
      // Pin the selected post
      await updateBlogPost(postId, { is_pinned: true })
      setPinnedPostId(postId)
    } catch (error) {
      logger.log('Failed to pin/unpin blog post:', error)
    }
  }

  const handleEdit = (id: string) => {
    setLocalLoading(true)
    router.push(`/admin/sections/blog-posts/edit/${id}`)
    setLocalLoading(false)
  }

  return (
    <div className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600  ">{error}</div>}

      {localLoading && <div className="p-4 bg-gray-50 text-gray-600 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900">Loading...</div>}

      <div className="flex justify-between items-center">
     
        <Button
          onClick={() => router.push(`/admin/sections/blog-posts/create`)}
          variant="primary"
          disabled={loading}
        >
          Add Blog Post
        </Button>
      </div>

      <div className="overflow-hidden bg-white   shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Excerpt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pinned
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogPosts ? (
              blogPosts.map((post) => (
                <tr key={post.id} className={loading ? 'opacity-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title.length > 30 ? post.title.slice(0, 30) + '…' : post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">/news/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                    {post.excerpt.length > 30 ? post.excerpt.slice(0, 30) + '…' : post.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="radio"
                      name="pinned-post"
                      value={post.id}
                      checked={post.is_pinned}
                      onChange={() => handlePin(post.id)}
                      disabled={loading}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Button
                      onClick={() =>
                        handleEdit(post.id)
                      }
                      variant="success"
                      size='sm'
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id.toString())}
                      variant="danger"
                      size='sm'
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center">
                  {loading ? 'Loading blog posts...' : 'No blog posts found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
