import { notFound } from 'next/navigation'
import Image from 'next/image'
import styles from './blog-post.module.css'
import { blogPostService } from '@/lib/services/blog-post.service'

interface PageProps {
  params: {
    slug: string
  }
}


export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  // Find the blog post with the matching slug
  const post = await blogPostService.getBlogPostBySlug(slug)

  // If the post doesn't exist, return a 404
  if (!post) {
    notFound()
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content_html.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <>
    
      <article
        className="blog-post py-8 md:py-[100px] flex flex-col gap-[35px] bg-[#FFE8D8]"
        itemScope
        itemType="https://schema.org/Article"
      >
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={post.excerpt || post.title} />
        <meta itemProp="inLanguage" content="en" />
        <meta itemProp="datePublished" content={post.created_at} />
        <meta itemProp="dateModified" content={post.created_at} />
        <meta itemProp="author" content="ZIRO Healthcare Solutions" />
        <meta itemProp="publisher" content="ZIRO Healthcare Solutions" />
        <div className='max-w-7xl mx-auto px-[20px] md:px-0 flex flex-col gap-6'>


          <header className="flex flex-col gap-8">
            <h1
              className="text-[38px] font-semibold mb-4 "
              itemProp="name"
            >
              {post.title}
            </h1>





            {post.excerpt && (
              <p
                className="text-xl text-gray-600 text-center max-w-2xl mx-auto"
                itemProp="abstract"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.trim()
                }}
              >
              </p>
            )}

            <div className="w-full flex items-center justify-center">
              <div itemProp='image' className="w-full max-w-full mx-auto">
                <div className="relative w-full aspect-[16/9] h-auto">
                  <Image
                    src={post.image_url}
                    alt={post.image_alt || post.title}
                    fill
                    className="object-cover w-full h-full"
                    priority
                    itemProp="image"
                    quality={100}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </header>
          <div className='flex flex-col lg:flex-row gap-8 border '>

          <aside className=' border  lg:w-[300px]'>

            <div className="text-base flex flex-col  gap-4">
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>{readingTime} min read</span>
            </div>

          </aside>

          <div className='flex-1'>

            <div
              className={styles.blogPostContent}
              itemProp="articleBody"
              dangerouslySetInnerHTML={{
                __html: post.content_html.trim()
              }}
            />

            <footer className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                {/* {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )} */}

                <div className="text-sm text-gray-600">
                  Last updated: {' '}
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('en', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </footer>
          </div>
          </div>
        </div>

      </article>
    </>
  )
}
