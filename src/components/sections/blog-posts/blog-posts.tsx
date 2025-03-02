import { Suspense } from 'react';
import Link from 'next/link';
import { getBlogPostService } from '@/lib/services/blog-post.service';
import { BlogPost } from '@/domain/models/blog-post.model';
import Image from 'next/image';


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
        className="flex flex-col gap-[8px] relative"
        itemProp="url"
      >
        <div className='border border-red-500 flex gap-4'>
          {post.imageurl && (
            <div
              className="w-full aspect-[6/3] sm:h-full sm:w-full border border-red-500"
              role="img"
              aria-label={`${post.title} preview image`}
            >
              <Image
                className='w-full h-auto '
                src={post.imageurl}
                alt={post.imageAlt || post.title}
                width={1000}
                height={1000}
                loading="lazy"
              />
            </div>
          )}
          <div className='border border-green-500'>


            <h2
              className="text-xl font-semibold text-center "
              itemProp="headline"
            >
              {post.title}
            </h2>
            <div
              className='absolute top-8 left-8 px-[10px] py-[5px] bg-white rounded-full'
              itemProp="datePublished"
            >
              {new Date(post.createdAt).toLocaleDateString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
        <meta itemProp="position" content={String(position)} />
      </Link>
    </li>
  )
}
