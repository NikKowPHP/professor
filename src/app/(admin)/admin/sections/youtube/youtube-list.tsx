'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { YoutubeItem } from '@/lib/data/youtube-section'
import { youtubeSectionService } from '@/lib/services/youtube-section.service'
import { YoutubeForm } from './components/youtube-form'
import logger from '@/lib/logger'

export function YoutubeList() {
  const [youtubeSections, setYoutubeSections] = useState<YoutubeItem[]>([])
  const [editingYoutubeSection, setEditingYoutubeSection] = useState<YoutubeItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchYoutubeSections = async () => {
      setLoading(true)
      try {
        const sections = await youtubeSectionService.getYoutubeSections()
        setYoutubeSections(sections)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load youtube sections.')
        logger.error('Failed to fetch youtube sections', err)
      } finally {
        setLoading(false)
      }
    }

    fetchYoutubeSections()
  }, [])

  const handleCreate = async (data: Partial<YoutubeItem>) => {
    setLoading(true)
    try {
      await youtubeSectionService.createYoutubeSection(data)
      setIsCreating(false)
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to create youtube section.')
      logger.error('Failed to create youtube section:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string, data: Partial<YoutubeItem>) => {
    setLoading(true)
    if (!editingYoutubeSection) return
    try {
      await youtubeSectionService.updateYoutubeSection(id, data)
      setEditingYoutubeSection(null)
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to update youtube section.')
      logger.error('Failed to update youtube section:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    if (confirm('Are you sure you want to delete this youtube section?')) {
      try {
        await youtubeSectionService.deleteYoutubeSection(id)
        router.refresh()
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Failed to delete youtube section.')
        logger.error('Failed to delete youtube section:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      {error && <div className="p-4 bg-red-50 text-red-600  ">{error}</div>}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          Add Youtube Section
        </button>
      </div>

      {(isCreating || editingYoutubeSection) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white   p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-[32px] font-medium tracking-[-0.02em] text-gray-900 mb-8">
              {editingYoutubeSection ? 'Edit Youtube Section' : 'New Youtube Section'}
            </h3>
            <YoutubeForm
              youtubeSection={editingYoutubeSection ?? undefined}
              onSubmit={editingYoutubeSection ? (data) => handleUpdate(editingYoutubeSection.id, data) : handleCreate}
              onCancel={() => {
                setEditingYoutubeSection(null)
                setIsCreating(false)
              }}
              loading={loading}
            />
          </div>
        </div>
      )}

      <div className="overflow-hidden bg-white   shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Youtube URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quote
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {youtubeSections?.map((youtubeSection) => (
              <tr key={youtubeSection.id} className={loading ? 'opacity-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {youtubeSection.youtube_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {youtubeSection.quote}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => setEditingYoutubeSection(youtubeSection)}
                    className="text-primary hover:text-primary/90 disabled:opacity-50"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(youtubeSection.id)}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
