'use client'

import { Navbar } from '@/components/layout/navbar/navbar'
import { Footer } from '@/components/layout/footer/footer'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
      <div className='bg-white w-full'>
    <div className='bg-white  pb-[40px]  relative'>

      <Navbar />
      {children}
        <Footer />
    </div>
      </div>
  )
}

