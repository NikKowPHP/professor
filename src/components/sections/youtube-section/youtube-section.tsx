'use client'

import {  youtubeItem } from '@/lib/data/youtube-section'
import YouTube from 'react-youtube'

export const YoutubeSection = () => {

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      mute: 1,
      controls: 1,
      playlist: youtubeItem.youtube_url,
      loop: 1,
      modestbranding: 1,
      rel: 0,
    },
  
  }

  return (
      <section
      id='youtube-section'
        className="pt-[50px] sm:pt-[100px] pb-[50px] px-[20px] md:px-0"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-[30px] max-w-7xl mx-auto'>

            <div className="relative w-full  ">
              <div className="pb-[80.25%]">
                <div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
                  <YouTube
                    videoId={youtubeItem.youtube_url}
                    opts={opts}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

          <div className=' flex flex-col justify-center items-center px-[20px]'>

            <h2 className='text-[16px] font-medium text-center'>
              {youtubeItem.quote}
            </h2>
          </div>

        </div>

      </section>
  
  )
}