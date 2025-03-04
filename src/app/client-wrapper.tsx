'use client'

import { Navbar } from '@/components/layout/navbar/navbar'
import { Footer } from '@/components/layout/footer/footer'
import { usePage } from '@/contexts/page-context'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { isAdminRoute } = usePage()
  return (
      <div className='bg-white w-full'>
    <div className='bg-white  relative'>

        {!isAdminRoute && <Navbar />}
      {children}
        {!isAdminRoute && <Footer />}
    </div>
      </div>
  )
}

