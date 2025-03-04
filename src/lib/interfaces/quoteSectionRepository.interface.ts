import { QuoteItem } from "../data/quote-section"

export interface IQuoteSectionRepository {
  getQuoteSection: () => Promise<QuoteItem | null>
  updateQuoteSection: (id: string, quoteSection: Partial<QuoteItem>) => Promise<QuoteItem>
}