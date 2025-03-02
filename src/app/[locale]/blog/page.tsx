

import { Suspense } from 'react'
import { BlogPosts } from '@/components/sections/blog-posts/blog-posts'



export default async function BlogPage() {
  
  return (
    
   
      <div 
        className="mx-auto   px-[20px] md:px-0 bg-[#FFB17B] border w -full"
        itemScope 
        itemType="https://schema.org/Blog"
      >
        <meta itemProp="name" content="ZIRO Healthcare Technology Blog" />
        <meta
          itemProp="description"
          content="Latest insights and articles about healthcare technology, medical software development, and digital health solutions."
        />
        <meta itemProp="inLanguage" content="en" />
        
        <Suspense 
          fallback={
            <div className="min-h-[500px]">
              <span className="sr-only">Loading healthcare articles...</span>
              Loading posts...
            </div>
          }
        >
          <BlogPosts />
        
        </Suspense>
      </div>

  )
}


