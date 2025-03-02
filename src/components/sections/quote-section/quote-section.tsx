'use client'

import {  quoteItem } from '@/lib/data/quote-section'

export const QuoteSection = () => {


  return (
      <section
      id='quote-section'
        className=" py-[50px]  bg-black flex flex-col justify-center items-center"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
      <div className='max-w-7xl mx-auto border border-blue-500'>
        
          <h2 className='text-[48px] font-normal text-center text-white leading-[1.2]'>
            {quoteItem.quote}
          </h2>

        </div>
        

      </section>
  
  )
}