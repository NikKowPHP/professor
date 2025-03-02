import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { YoutubeItem } from '../data/youtube-section'
import logger from '@/lib/logger'
import { IYoutubeSectionRepository } from '../interfaces/youtubeSectionRepository.interface'
export class YoutubeSectionRepository implements IYoutubeSectionRepository {
  private supabaseClient: SupabaseClient
  private tableName: string = 'youtube_sections'
  constructor() {
    this.supabaseClient = supabase
  }

  getYoutubeSections = async (): Promise<YoutubeItem[]> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })

      if (error) {
        logger.log('Error fetching testimonials:', error)
        return []
      }

      return data;

    }

    getActiveYoutubeSection = async() => {
      const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)
      .single()

      if (error) {
        logger.log('Error fetching active youtube section:', error)
        return null
      }

      return data
    }

  getYoutubeSectionById = async (id: string): Promise<YoutubeItem | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      logger.log('Error fetching testimonial by ID:', error)
      return null
    }

    if (!data) {
      return null
    }

    return data
  }

  createYoutubeSection = async (youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    logger.log('youtubeSection data ', youtubeSection)

    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .insert(youtubeSection)
      .select()
      .single()

    if (error) {
      logger.log('Error creating testimonial:', error)
        throw new Error('Failed to create testimonial')
    }

    return data
  }

  updateYoutubeSection = async (id: string, youtubeSection: Partial<YoutubeItem>): Promise<YoutubeItem> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update({
        youtube_url: youtubeSection.youtube_url,
        quote: youtubeSection.quote,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      logger.log('Error updating testimonial:', error)
      throw new Error('Failed to update testimonial')
    }

    if (!data) {
      throw new Error('Failed to update testimonial')
    }

    return data
  }

  deleteYoutubeSection = async (id: string): Promise<void> => {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', id)

    if (error) {
      logger.log('Error deleting testimonial:', error)
      throw new Error('Failed to delete testimonial')
    }
  }
}

// export singleton
export const youtubeSectionRepository = new YoutubeSectionRepository()