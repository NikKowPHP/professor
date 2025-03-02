import { QuoteItem } from "../data/quote-section"
import { QuoteSectionRepository, quoteSectionRepository } from "../repositories/quote.repository"

export class QuoteSectionService {
  private quoteSectionRepository: QuoteSectionRepository
  constructor() {
      this.quoteSectionRepository = quoteSectionRepository 
  }

  getQuoteSection = async (): Promise<QuoteItem | null> => {
    return this.quoteSectionRepository.getQuoteSection()
  }


  updateQuoteSection = async (id: string, quoteSection: Partial<QuoteItem>): Promise<QuoteItem> => {
    return this.quoteSectionRepository.updateQuoteSection(id, quoteSection)
  }

}

// export singleton
export const quoteSectionService = new QuoteSectionService()

export const getQuoteSectionService = async () => {
  return new QuoteSectionService()
}