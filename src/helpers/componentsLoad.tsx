import dynamic from 'next/dynamic'


export const HeroSection = dynamic(
  () =>
    import('@/components/sections/hero/hero').then((mod) => mod.HeroSection),
  {
    ssr: true,
  }
)


export const MyExpertise = dynamic(
  () =>
    import('@/components/sections/my-expertise/my-expertise').then(
      (mod) => mod.MyExpertise
    ),
  {
    ssr: true,
  }
)

export const YoutubeSection = dynamic(
  () =>
    import('@/components/sections/youtube-section/youtube-section').then(
      (mod) => mod.YoutubeSection
    ),
  {
    ssr: true,
  }
)


export const BlogPosts = dynamic(
  () =>
    import('@/components/sections/blog-posts/blog-posts').then(
      (mod) => mod.BlogPosts
    ),
  { 
    ssr: true,
  }
)



export const QuoteSection = dynamic(
  () => import('@/components/sections/quote-section/quote-section').then(mod => mod.QuoteSection),
  {
    ssr: true,
  }
)
