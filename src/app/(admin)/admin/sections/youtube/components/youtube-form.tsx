'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { YoutubeItem } from '@/lib/data/youtube-section'

interface YoutubeFormProps {
  youtubeSection?: YoutubeItem
  onSubmit: (data: Partial<YoutubeItem>) => Promise<void>
  onCancel: () => void
  loading: boolean
}

export function YoutubeForm({
  youtubeSection,
  onSubmit,
  onCancel,
  loading,
}: YoutubeFormProps) {
  const [youtube_url, setYoutubeUrl] = useState(youtubeSection?.youtube_url || '')
  const [quote, setQuote] = useState(youtubeSection?.quote || '')
  const [is_active, setIsActive] = useState(youtubeSection?.is_active || false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ youtube_url, quote, is_active })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="youtube_url"
          className="block text-sm font-medium text-gray-700"
        >
          Youtube URL
        </label>
        <input
          type="text"
          id="youtube_url"
          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={youtube_url}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />
      </div>
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
      <div>
        <label
          htmlFor="is_active"
          className="block text-sm font-medium text-gray-700"
        >
          Is Active
        </label>
        <input
          type="checkbox"
          id="is_active"
          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          checked={is_active}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {youtubeSection ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
