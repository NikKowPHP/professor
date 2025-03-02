import { YoutubeItem } from "../data/youtube-section"

export interface IYoutubeSectionRepository {
  getYoutubeSections: () => Promise<YoutubeItem[]>
  getYoutubeSectionById: (id: string) => Promise<YoutubeItem | null>
  createYoutubeSection: (youtubeSection: Partial<YoutubeItem>) => Promise<YoutubeItem>
  updateYoutubeSection: (id: string, youtubeSection: Partial<YoutubeItem>) => Promise<YoutubeItem>
  deleteYoutubeSection: (id: string) => Promise<void>
  getActiveYoutubeSection: () => Promise<YoutubeItem | null>
}