import { QuoteItem } from "../data/quote-section"
import {  quoteSectionRepository } from "../repositories/quote.repository"
import { quoteSectionRepositoryLocal } from "../repositories/quote.repository.local"
import { IQuoteSectionRepository } from "../interfaces/quoteSectionRepository.interface"


export class QuoteSectionService {
  private quoteSectionRepository: IQuoteSectionRepository
  constructor() {
      if(process.env.NEXT_PUBLIC_MOCK_REPOSITORIES === 'true') {
        this.quoteSectionRepository = quoteSectionRepositoryLocal 
      } else {
        this.quoteSectionRepository = quoteSectionRepository 
      }
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