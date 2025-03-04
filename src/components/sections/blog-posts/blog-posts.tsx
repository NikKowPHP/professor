import { Suspense } from 'react';
import Link from 'next/link';
import { getBlogPostService } from '@/lib/services/blog-post.service';
import { BlogPost } from '@/domain/models/blog-post.model';
import Image from 'next/image';
import { Tag } from '@/components/ui/tag/tag';
import { ArrowUpRight } from 'lucide-react';


export async function BlogPosts({displayReadAll = true}: {displayReadAll?: boolean}) {
  const blogPostService = await getBlogPostService()
  const blogPosts = await blogPostService.getBlogPosts()
  return (
    <section id="work" className="relative overflow-hidden    py-[50px] md:py-[100px]">
      <div className='max-w-7xl px-[20px] md:px-0 mx-auto flex flex-col gap-[20px]'>
        <h1
          className="text-[36px] sm:text-[48px] lg:text-[48px] leading-[1.1] font-medium tracking-[-0.02em] "
          itemProp="headline"
        >
          The latest news from me and the insights

        </h1>
        {displayReadAll && (
          <Link href="/blog">
            <span className='flex items-center gap-2'>
              Read All
              <ArrowUpRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}

        <Suspense
          fallback={
            <div className="min-h-[500px]">
              <span className="sr-only">Loading healthcare articles...</span>
              Loading posts...
            </div>
          }
        >
          <ul
            className="relative mx-auto  flex flex-col gap-[20px] md:gap-[40px] w-full justify-start"
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

      </div>
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
      className=" max-w-5xl"
      itemScope
      itemType="https://schema.org/BlogPosting"
      itemProp="itemListElement"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="grid grid-cols-1 lg:grid-cols-2 h-full"
        itemProp="url"
      >
        {/* Image Section */}
        {post.imageurl && (
          <div
            className="w-full aspect-[6/3] sm:h-full sm:w-full  overflow-hidden min-h-[500px]"
            role="img"
            aria-label={`${post.title} preview image`}
          >
            <Image
              className='w-full h-full object-cover '
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
        <div className="flex flex-col justify-between h-full p-[20px] gap-[20px]  bg-[#FFE8D8]">
          <header className="flex justify-between gap-2">
            <div
              className="px-[10px] py-[5px]"
              itemProp="datePublished"
            >
              {new Date(post.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center">
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

          <div
            className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium tracking-[-0.02em] flex items-center gap-2"
            itemProp="headline"
          >
            <div
              className="flex-1"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <ArrowUpRight className="transition-transform group-hover:translate-x-1" />
          </div>

        </div>
        <meta itemProp="position" content={String(position)} />
      </Link>
    </li>
  )
}
