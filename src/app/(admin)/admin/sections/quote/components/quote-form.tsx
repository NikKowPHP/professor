'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { useAdmin } from '@/contexts/admin-context'

export function QuoteForm() {
  const { quote, updateQuote, loading } = useAdmin()
  console.log(quote);
  const [quoteText, setQuoteText] = useState(quote?.quote || '')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateQuote({ quote: quoteText, id: quote?.id, updated_at: new Date().toISOString() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="quote"
          className="block text-lg font-medium text-gray-700"
        >
          Quote
        </label>
        <textarea
          id="quote"
          rows={3}
          className="mt-1 block w-full   border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-lg"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        
        <Button variant="primary" type="submit" disabled={loading}>
          Update
        </Button>
      </div>
    </form>
  )
}
