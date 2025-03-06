export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  created_at: string;
  image_alt?: string;
  excerpt: string;
  content_html: string;
  is_pinned: boolean;
  tag: string;
  updated_at: string;

}

export interface QuoteItem {
  id: string
  quote: string
  created_at: string
  updated_at: string
}



export interface YoutubeItem {
  id: string
  youtube_url: string
  quote: string
  created_at: Date
  updated_at: Date
}