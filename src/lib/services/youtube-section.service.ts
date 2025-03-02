import { YoutubeItem } from "../data/youtube-section"
import { IYoutubeSectionRepository } from "../interfaces/youtubeSectionRepository.interface"
import { youtubeSectionRepository } from "../repositories/youtubeSection.repository"

export class YoutubeSectionService {
  private youtubeSectionRepository: IYoutubeSectionRepository
  constructor() {
      this.youtubeSectionRepository = youtubeSectionRepository 
  }

  getYoutubeSections = async (): Promise<YoutubeItem[]> => {
    return this.youtubeSectionRepository.getYoutubeSections()
  }

  getYoutubeSectionById = async (id: string): Promise<YoutubeItem | null> => {
    return this.youtubeSectionRepository.getYoutubeSectionById(id)
  }

  createYoutubeSection = async (youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    return this.youtubeSectionRepository.createYoutubeSection(youtubeSection)
  }

  updateYoutubeSection = async (id: string, youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    return this.youtubeSectionRepository.updateYoutubeSection(id, youtubeSection)
  }

  deleteYoutubeSection = async (id: string): Promise<void> => {
    return this.youtubeSectionRepository.deleteYoutubeSection(id)
  }

  getActiveYoutubeSection = async (): Promise<YoutubeItem | null> => {
    return this.youtubeSectionRepository.getActiveYoutubeSection()
  }
}

// export singleton
export const youtubeSectionService = new YoutubeSectionService()

export const getYoutubeSectionService = async () => {
  return new YoutubeSectionService()
}