import { QuoteItem } from "@/domain/models/models"


 const quoteItem: QuoteItem = {
  id: 'quoteItem1',
  quote: '"True disruption in healthcare requires a shift in mindset. We need to think bigger, embrace cost reduction, and consider our impact on the planet and the economy to achieve sustainability.',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export function getMockQuoteItem(): QuoteItem {
  return quoteItem
}