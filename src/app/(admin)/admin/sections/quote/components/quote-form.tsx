'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { QuoteItem } from '@/lib/data/quote-section'

interface QuoteFormProps {
  quoteSection?: QuoteItem | null
  onSubmit: (data: Partial<QuoteItem>) => Promise<void>
  onCancel: () => void
  loading: boolean
}

export function QuoteForm({
  quoteSection,
  onSubmit,
  onCancel,
  loading,
}: QuoteFormProps) {
  const [quote, setQuote] = useState(quoteSection?.quote || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ quote })
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
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {quoteSection ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
