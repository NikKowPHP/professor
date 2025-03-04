import { YoutubeItem } from "../data/youtube-section"
import { IYoutubeSectionRepository } from "../interfaces/youtubeSectionRepository.interface"
import { youtubeSectionRepository } from "../repositories/youtubeSection.repository"

export class YoutubeSectionService {
  private youtubeSectionRepository: IYoutubeSectionRepository
  constructor() {
      this.youtubeSectionRepository = youtubeSectionRepository 
  }

 
  getYoutubeSection = async ( ): Promise<YoutubeItem | null> => {
    return this.youtubeSectionRepository.getYoutubeSection()
  }

 

  updateYoutubeSection = async (youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    return this.youtubeSectionRepository.updateYoutubeSection(youtubeSection)
  }



 
}

// export singleton
export const youtubeSectionService = new YoutubeSectionService()

export const getYoutubeSectionService = async () => {
  return new YoutubeSectionService()
}