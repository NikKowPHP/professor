export interface YoutubeItem {
    id: string
    youtube_url: string
    quote: string
}
  

export const youtubeItem: YoutubeItem = {
    id: 'youtubeItem1',
    youtube_url: 'SDrQH84YzU0',
    quote: '"Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.'
}
  
  export async function getYoutubeItem(): Promise<YoutubeItem> {
    return youtubeItem
  }