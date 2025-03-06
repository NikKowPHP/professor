import { YoutubeItem } from '@/domain/models/models'
import logger from '@/lib/logger'
import { IYoutubeSectionRepository } from '@/lib/interfaces/repositories.interface'
import { SqlLiteAdapter } from './adapters/sqllite.adapter'
import { Database } from 'sqlite3'
import { getDatabaseFilePath } from '@/lib/config/database.config'

const dbPath = getDatabaseFilePath()
const db = new Database(dbPath)

class YoutubeSectionRepository
  extends SqlLiteAdapter<YoutubeItem, string>
  implements IYoutubeSectionRepository
{
  constructor() {
    super('youtube_section', db)
  }

  getYoutubeSection = async (): Promise<YoutubeItem | null> => {
    try {
      // Assuming there's only one youtube section, fetch the first one
      const youtubeSections = await this.list()
      return youtubeSections.length > 0 ? youtubeSections[0] : null
    } catch (error) {
      logger.error('Error fetching youtube section:', error)
      return null
    }
  }

  updateYoutubeSection = async (
    youtubeSection: Partial<YoutubeItem>,
  ): Promise<YoutubeItem> => {
    try {
      if (!youtubeSection.id) {
        throw new Error('ID is required for updating youtube section')
      }
      const updatedYoutubeSection = await this.update(
        youtubeSection.id,
        youtubeSection,
      )
      if (!updatedYoutubeSection) {
        throw new Error('Failed to update youtube section')
      }
      return updatedYoutubeSection
    } catch (error) {
      logger.error('Error updating youtube section:', error)
      throw new Error('Failed to update youtube section')
    }
  }
}

// export singleton
export const youtubeSectionRepositoryLocal = new YoutubeSectionRepository()