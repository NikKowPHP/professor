import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { YoutubeItem } from '@/domain/models/models'
import logger from '@/lib/logger'
import { IYoutubeSectionRepository } from '@/lib/interfaces/repositories.interface'

export class YoutubeSectionRepository implements IYoutubeSectionRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'proffessor_youtube_section'
  constructor() {
    this.supabaseClient = supabase
  }

  getYoutubeSection = async (): Promise<YoutubeItem | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .single()
    logger.log('getYoutubeSection data ', data)
    if (error) {
      logger.log('Error fetching youtube section by ID:', error)
      return null
    }
    return data
  }

  updateYoutubeSection = async (
    youtubeSection: Partial<YoutubeItem>
  ): Promise<YoutubeItem> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update({
        youtube_url: youtubeSection.youtube_url,
        quote: youtubeSection.quote,
        updated_at: new Date().toISOString(),
      })
      .eq('id', youtubeSection.id)
      .select()
      .single()
    logger.log('updateYoutubeSection data ', data)
    if (error) {
      logger.log('Error updating youtube section:', error)
      throw new Error('Failed to update youtube section')
    }

    if (!data) {
      throw new Error('Failed to update youtube section')
    }

    return data
  }
}

// export singleton
export const youtubeSectionRepository = new YoutubeSectionRepository()
