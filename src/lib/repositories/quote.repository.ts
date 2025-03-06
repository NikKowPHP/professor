import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { QuoteItem } from '../data/quote-section'
import logger from '@/lib/logger'

export class QuoteSectionRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'professor_quote_section'
  constructor() {
    this.supabaseClient = supabase
  }

  updateQuoteSection = async (id: string, quoteSection: Partial<QuoteItem>): Promise<QuoteItem> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update({
        quote: quoteSection.quote,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()
      logger.log('updateQuoteSection data ' ,data);
    if (error) {
      logger.log('Error updating quote section:', error)
      throw new Error('Failed to update quote section')
    }

    if (!data) {
      throw new Error('Failed to update quote section')
    }

    return data
  }

  getQuoteSection = async (): Promise<QuoteItem | null> => {
    // Bypass unstable_cache completely
    logger.log('Repository: Fetching quote section directly (no cache)');
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .single();
    
    logger.log('getQuoteSection data ', data);
    
    if (error) {
      logger.log('Error fetching quote section:', error);
      return null;
    }
    
    return data;
  }
}

// export singleton
export const quoteSectionRepository = new QuoteSectionRepository()