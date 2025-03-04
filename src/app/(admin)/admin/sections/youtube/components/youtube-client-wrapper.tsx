'use client'

import { useState } from 'react'
import { YoutubeItem } from '@/lib/data/youtube-section'
import { YoutubeForm } from './youtube-form'
import { youtubeSectionService } from '@/lib/services/youtube-section.service'

interface YoutubeClientWrapperProps {
  youtubeSection: YoutubeItem | null
}

export function YoutubeClientWrapper({ youtubeSection }: YoutubeClientWrapperProps) {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Partial<YoutubeItem>) => {
    setLoading(true)
    try {
      if (youtubeSection) {
        await youtubeSectionService.updateYoutubeSection(data)
      }
      console.log('onSubmit', data)
    } catch (error) {
      console.error('Failed to update quote section:', error)
    } finally {
      setLoading(false)
    }
  }



  return (
    <YoutubeForm
      onSubmit={onSubmit}
      loading={loading}
      youtubeSection={youtubeSection || undefined}
    />
  )
}