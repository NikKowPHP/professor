import { Suspense } from 'react'
import { BlogPostList } from './blog-posts-list'

export default async function BlogPostsAdminPage() {

  return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">News & Insights Management</h2>
          <Suspense 
            fallback={
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
                <p className="text-gray-600">Loading posts...</p>
              </div>
            }
          >
            <BlogPostList />
          </Suspense>
        </div>
      </div>
  )
}