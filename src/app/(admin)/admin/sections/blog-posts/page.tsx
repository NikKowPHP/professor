import { Suspense } from 'react'
import { BlogPostList } from './blog-posts-list'

export default async function BlogPostsAdminPage() {

  return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Blog Posts Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <BlogPostList />
          </Suspense>
        </div>
      </div>
  )
}