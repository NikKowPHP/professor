// import { TestimonialList } from './testimonial-list'
import { Suspense } from 'react'
import { AdminProvider } from '@/contexts/admin-context'
import { quoteSectionService } from '@/lib/services/quote-section.service'
import { QuoteClientWrapper } from './components/quote-client-wrapper'

export default async function QuoteAdminPage() {
  const quoteSection = await quoteSectionService.getQuoteSection()

  
  

  return (
    <AdminProvider>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Quote Section Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <YoutubeList /> */}
            <QuoteClientWrapper quoteSection={quoteSection} />
          </Suspense>
        </div>
      </div>
    </AdminProvider>
  )
}
