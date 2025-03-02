'use client'

import { useState } from 'react'
import { QuoteItem } from '@/lib/data/quote-section'
import { QuoteForm } from './quote-form'
import { quoteSectionService } from '@/lib/services/quote-section.service'

interface QuoteClientWrapperProps {
  quoteSection: QuoteItem | null
}

export function QuoteClientWrapper({ quoteSection }: QuoteClientWrapperProps) {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Partial<QuoteItem>) => {
    setLoading(true)
    try {
      if (quoteSection) {
        await quoteSectionService.updateQuoteSection(quoteSection.id, data)
      }
      console.log('onSubmit', data)
    } catch (error) {
      console.error('Failed to update quote section:', error)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    // TODO: Implement cancel logic
  }

  return (
    <QuoteForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      loading={loading}
      quoteSection={quoteSection}
    />
  )
}