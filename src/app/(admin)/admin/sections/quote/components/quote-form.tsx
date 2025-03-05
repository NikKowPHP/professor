'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { useAdmin } from '@/contexts/admin-context'

export function QuoteForm() {
  const { quote, updateQuote, loading, getQuote,revalidateCache } = useAdmin()
  const [quoteText, setQuoteText] = useState('')

  // Sync form state with context
  useEffect(() => {
    setQuoteText(quote?.quote || '')
  }, [quote])
  useEffect(() => {
    getQuote();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateQuote({ 
        quote: quoteText,
        id: quote?.id,
        updated_at: new Date().toISOString()
      })
      // Refresh data after update
      await getQuote()
    } catch (error) {
      console.error('Update failed:', error)
    }
  }
  const handleRefresh = async () => {
    await Promise.all([getQuote(), revalidateCache()])
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
          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-lg"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button 
          variant="secondary" 
          type="button" 
          onClick={handleRefresh} 
          disabled={loading}
        >
          Refresh
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  )
}
