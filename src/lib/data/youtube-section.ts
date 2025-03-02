export interface YoutubeItem {
    id: string
    youtube_url: string
    quote: string
    created_at: Date
    updated_at: Date
    is_active: boolean
}
  

export const youtubeItem: YoutubeItem = {
    id: 'youtubeItem1',
    youtube_url: 'SDrQH84YzU0',
    quote: '"Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
}
  
  export async function getYoutubeItem(): Promise<YoutubeItem> {
    return youtubeItem
  }