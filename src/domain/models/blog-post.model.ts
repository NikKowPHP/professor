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
  updated_at: string;

}