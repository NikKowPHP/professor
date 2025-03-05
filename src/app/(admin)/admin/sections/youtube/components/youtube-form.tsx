'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { useAdmin } from '@/contexts/admin-context'
import { LoadingSpinner } from '@/components/ui/loadingSpinner'


export function YoutubeForm() {
  const { youtube, updateYoutube, loading, getYoutube } = useAdmin()


  const [youtube_url, setYoutubeUrl] = useState(youtube?.youtube_url || '')
  const [quote, setQuote] = useState(youtube?.quote || '')

  useEffect(() => {
    getYoutube()

  }, [])
  console.log('youtubeSection fetched on form', youtube)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateYoutube({ youtube_url, quote, id: youtube?.id, updated_at: new Date() })
  }

  if(loading) return <LoadingSpinner />

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="youtube_url"
          className="block text-lg font-medium text-gray-700"
        >
          Youtube URL
        </label>
        <input
          type="text"
          id="youtube_url"
          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-lg"
          value={youtube_url}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />
      </div>
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
          className="mt-1 block w-full   border-gray-300 shadow-sm focus:border-primary focus:ring-primary  sm:text-lg"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
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
