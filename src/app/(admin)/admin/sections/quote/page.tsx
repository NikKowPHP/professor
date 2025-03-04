import { Suspense } from 'react'
import { AdminProvider } from '@/contexts/admin-context'
import { quoteSectionService } from '@/lib/services/quote-section.service'
import { QuoteForm } from './components/quote-form'

export default async function QuoteAdminPage() {
  const quoteSection = await quoteSectionService.getQuoteSection()

  
  return (
    <AdminProvider initialQuote={quoteSection}>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Quote Section Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <QuoteForm  />
          </Suspense> 
        </div>
      </div>
    </AdminProvider>
  )
}
