import { YoutubeItem } from "../data/youtube-section"

export interface IYoutubeSectionRepository {
  getYoutubeSection: () => Promise<YoutubeItem | null>
  updateYoutubeSection: (youtubeSection: Partial<YoutubeItem>) => Promise<YoutubeItem>
}
