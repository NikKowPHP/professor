'use client'

import YouTube from 'react-youtube'
import { useEffect } from 'react'
import { usePage } from '@/contexts/page-context'

export const YoutubeSection = () => {
  const { getYoutube, youtube, loading } = usePage()

  useEffect(() => {
    const fetchYoutubeSection = async () => {
      try {
        await getYoutube()
      } catch (error) {
        console.error('Failed to fetch youtube sections:', error)
      }
    }

    fetchYoutubeSection()
  }, [getYoutube])



  if (loading) {
    return <div  className="pt-[50px] sm:pt-[100px] pb-[50px] px-[20px] md:px-0">Loading...</div>
  }

  if (!youtube && !loading) {
    return <div className="pt-[50px] sm:pt-[100px] pb-[50px] px-[20px] md:px-0">No YouTube data available.</div>
  }

  if (!youtube) {
    return <div className="pt-[50px] sm:pt-[100px] pb-[50px] px-[20px] md:px-0">No YouTube data available.</div>
  }

  return (
    <section
      id="youtube-section"
      className="pt-[50px] sm:pt-[100px] pb-[50px] px-[20px] md:px-0"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] max-w-7xl mx-auto">
        <div className="relative w-full">
          <div className="pb-[80.25%]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <YouTube
                videoId={youtube!.youtube_url}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    mute: 1,
                    controls: 1,
                    playlist: youtube!.youtube_url,
                    loop: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className=" flex flex-col justify-center items-center px-[20px]">
          <h2 className="text-[16px] font-medium text-center">{youtube.quote}</h2>
        </div>
      </div>
    </section>
  )
}