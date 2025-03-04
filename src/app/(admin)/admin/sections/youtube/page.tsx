import { Suspense } from 'react'
import { AdminProvider } from '@/contexts/admin-context'
import { YoutubeClientWrapper } from './components/youtube-client-wrapper'
import { youtubeSectionService } from '@/lib/services/youtube-section.service'

export default async function YoutubeAdminPage() {
  const youtubeSection = await youtubeSectionService.getYoutubeSection()

  return (
    <AdminProvider>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Youtube Sections Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <YoutubeClientWrapper youtubeSection={youtubeSection} />
          </Suspense>
        </div>
      </div>
    </AdminProvider>
  )
}
