import { YoutubeItem } from "@/domain/models/models"

  

 const youtubeItem: YoutubeItem  = {
    id: 'youtubeItem1',
    youtube_url: 'SDrQH84YzU0',
    quote: '"Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
    created_at: new Date(),
    updated_at: new Date(),
}
  
  export  function getMockYoutubeItem(): YoutubeItem {
    return youtubeItem
  }