'use client'

import { Suspense } from 'react'
import {  youtubeItem } from '@/lib/data/youtube-section'
import YouTube from 'react-youtube'
import logger from '@/lib/logger'

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
        className=" py-[100px] "
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-[100px]'>

            <div className="relative w-full border border-red-500">
              <div className="pb-[56.25%]">
                <div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
                  <YouTube
                    videoId={youtubeItem.youtube_url}
                    opts={opts}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

          <div className='border border-blue-500 flex flex-col justify-center items-center'>

            <h2 className='text-[16px] font-medium'>
              {youtubeItem.quote}
            </h2>
          </div>

        </div>

      </section>
  
  )
}