import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { YoutubeItem } from '../data/youtube-section'
import logger from '@/lib/logger'
import { IYoutubeSectionRepository } from '../interfaces/youtubeSectionRepository.interface'
export class YoutubeSectionRepository implements IYoutubeSectionRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'professor_youtube_section'
  constructor() {
    this.supabaseClient = supabase
  }

  


  getYoutubeSection = async (): Promise<YoutubeItem | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .single()

    if (error) {
      logger.log('Error fetching youtube section by ID:', error)
      return null
    }

    if (!data) {
      return null
    }

    return data
  }


  updateYoutubeSection = async (youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
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