export type NodeType = 'post' | 'page' | 'category' | 'post_tag'

export type Yoast = {
  author?: string
  title: string
  description?: string
  canonical?: string
  robots: {
    index: string
    follow: string
    maxImagePreview?: string
    maxSnippet?: string
    maxVideoPreview?: string
  }
  og_locale?: string
  og_type?: string
  og_title?: string
  og_description?: string
  og_url?: string
  og_site_name?: string
  article_publisher?: string
  article_published_time?: string
  article_modified_time?: string
  og_image?: { url: string; width: number; height: number; type: string }[]
  twitter_card?: string
  twitter_creator?: string
  twitter_site?: string
  twitter_misc?: any
  schema?: any
}

type Translated = {
  wpml_current_locale: string
  wpml_translations: { locale: string; href: string }[]
  yoast_head_json: any
  link: string
}

export type Post = Translated & {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: 'post'
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string; protected: boolean }
  author: number
  featured_media: number
  featured_media_data: any
  comment_status: string
  categories: number[]
  tags: number[]
  acf: {
    color: string
    mailerlite: string
    author_description: string
    related_posts: number[]
    display_banner: boolean
  }
}

export type Page = Translated & {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: 'page'
  title: { rendered: string }
  content: { rendered: string; protected: boolean }
  excerpt: { rendered: string; protected: boolean }
  featured_media: number
  comment_status: string
  template: string
  acf: any
}

export type PageSection = {
  section_title: string
  section_icon: string
  section_intro: string
  section_banner: boolean
  section_banner_image: {
    url: string
    alt: string
    width: number
    height: number
    sizes: any
  }
  section_banner_text: string
  section_banner_link: { title: string; url: string; target: string }
  section_articles: { ID: number }[]
  section_read_more_label: string
  section_read_more_link: { title: string; url: string; target: string }
}

export type Category = Translated & {
  id: number
  count: number
  description: string
  name: string
  slug: string
  taxonomy: 'category'
  acf: any
}

export type Tag = Translated & {
  id: number
  count: number
  description: string
  name: string
  slug: string
  taxonomy: 'post_tag'
  acf: any
}

export type Comment = {
  id: number
  post: number
  parent: number
  author: number
  author_name: string
  author_url: string
  date: string
  children?: Comment[]
  content: { rendered: string }
  status: string
  type: 'comment'
  meta: { product_rating: number }
}

export type Node = Post | Tag | Category | Page
