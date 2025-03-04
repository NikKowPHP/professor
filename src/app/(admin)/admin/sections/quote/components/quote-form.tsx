'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { useAdmin } from '@/contexts/admin-context'

export function QuoteForm() {
  const { quote, updateQuote, loading } = useAdmin()
  const [quoteText, setQuoteText] = useState(quote?.quote || '')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateQuote({ quote: quoteText })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="quote"
          className="block text-sm font-medium text-gray-700"
        >
          Quote
        </label>
        <textarea
          id="quote"
          rows={3}
          className="mt-1 block w-full   border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
