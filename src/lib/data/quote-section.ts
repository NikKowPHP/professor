export interface QuoteItem {
    id: string
    quote: string
}
  

export const quoteItem: QuoteItem = {
    id: 'quoteItem1',
    quote: '"True disruption in healthcare requires a shift in mindset. We need to think bigger, embrace cost reduction, and consider our impact on the planet and the economy to achieve sustainability.'
}
  
  export async function getQuoteItem(): Promise<QuoteItem> {
    return quoteItem
  }