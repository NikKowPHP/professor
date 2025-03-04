import { QuoteItem } from '../data/quote-section'
import logger from '@/lib/logger'
import { SqlLiteAdapter } from './adapters/sqllite.adapter'
import { Database } from 'sqlite3'
import { getDatabaseFilePath } from '@/lib/config/database.config'

const dbPath = getDatabaseFilePath()
const db = new Database(dbPath)

class QuoteSectionRepository extends SqlLiteAdapter<QuoteItem, string> {
  constructor() {
    super('quote_section', db)
  }

  getQuoteSection = async (): Promise<QuoteItem | null> => {
    try {
      const quoteSections = await this.list()
      return quoteSections.length > 0 ? quoteSections[0] : null
    } catch (error) {
      logger.error('Error fetching quote section:', error)
      return null
    }
  }

  updateQuoteSection = async (
    id: string,
    quoteSection: Partial<QuoteItem>,
  ): Promise<QuoteItem> => {
    try {
      const updatedQuoteSection = await this.update(id, quoteSection)
      if (!updatedQuoteSection) {
        throw new Error('Failed to update quote section')
      }
      return updatedQuoteSection
    } catch (error) {
      logger.error('Error updating quote section:', error)
      throw new Error('Failed to update quote section')
    }
  }
}

// export singleton
export const quoteSectionRepository = new QuoteSectionRepository()