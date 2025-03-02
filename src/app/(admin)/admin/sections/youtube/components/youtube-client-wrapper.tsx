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
        await youtubeSectionService.updateYoutubeSection(youtubeSection.id, data)
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
    <YoutubeForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      loading={loading}
      youtubeSection={youtubeSection || undefined}
    />
  )
}