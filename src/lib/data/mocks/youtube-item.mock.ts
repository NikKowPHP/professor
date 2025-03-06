import { YoutubeItem } from "@/domain/models/models"

  

 const youtubeItem: YoutubeItem  = {
    id: 'youtubeItem1',
    youtube_url: 'SDrQH84YzU0',
    quote: '"Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
    created_at: new Date('2025-01-01'),
    updated_at: new Date('2025-01-01'),
}
  
  export  function getMockYoutubeItem(): YoutubeItem {
    return youtubeItem
  }