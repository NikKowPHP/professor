import { Suspense } from 'react';
import Link from 'next/link';
import { getBlogPostService } from '@/lib/services/blog-post.service';
import { BlogPost } from '@/domain/models/blog-post.model';
import Image from 'next/image';
import { Tag } from '@/components/ui/tag/tag';
import { ArrowUpRight } from 'lucide-react';


export async function BlogPosts() {
  const blogPostService = await getBlogPostService()
  const blogPosts = await blogPostService.getBlogPosts('en')
  return (
    <section id="work" className="relative overflow-hidden bg-white   py-[100px]">
      <h1
        className="text-[40px] sm:text-[56px] lg:text-[48px] leading-[1.1] font-medium tracking-[-0.02em] "
        itemProp="headline"
      >
        The latest news from me and the insights

      </h1>

      <Suspense
        fallback={
          <div className="min-h-[500px]">
            <span className="sr-only">Loading healthcare articles...</span>
            Loading posts...
          </div>
        }
      >
        <ul
          className="relative mx-auto  flex flex-col gap-16 max-w-5xl"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {blogPosts.map((post, index) => (
            <BlogPostItem
              key={post.slug}
              post={post}
              position={index + 1}
            />
          ))}
        </ul>
      </Suspense>

    </section>
  )
}




const BlogPostItem = ({
  post,
  position
}: {
  post: BlogPost
  position: number
}) => {
  return (
    <li
      className="border border-blue-500"
      itemScope
      itemType="https://schema.org/BlogPosting"
      itemProp="itemListElement"
    >
      <Link
        href={`/en/blog/${post.slug}`}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
        itemProp="url"
      >
        {/* Image Section */}
        {post.imageurl && (
          <div
            className="w-full aspect-[6/3] sm:h-full sm:w-full border border-red-500"
            role="img"
            aria-label={`${post.title} preview image`}
          >
            <Image
              className='w-full h-auto object-cover'
              src={post.imageurl}
              alt={post.imageAlt || post.title}
              width={1000}
              height={1000}
              loading="lazy"
              quality={100}
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-between h-full p-[20px] gap-[20px] border border-green-500 bg-[#FFE8D8]">
          <header className="flex justify-between gap-2">
          <div 
              className="px-[10px] py-[5px]"
              itemProp="datePublished"
            >
            {new Date(post.createdAt).toLocaleDateString()}
            </div>

            <div  className="flex items-center">
          <span>
            <Tag
            variant='simple'
              className="px-8 text-sm sm:text-base"
            >
              News
            </Tag>
          </span>
        </div>
           
          
          </header>

          {/* Add description if available in BlogPost model */}
          {/* <div className="text-[16px] line-clamp-4 overflow-hidden">
            {post.excerpt}
          </div> */}

<h2
              className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium tracking-[-0.02em] flex items-center gap-2"
              itemProp="headline"
            >
              {post.title} 
              <ArrowUpRight className="transition-transform group-hover:translate-x-1" />
            </h2>

        </div>
        <meta itemProp="position" content={String(position)} />
      </Link>
    </li>
  )
}
