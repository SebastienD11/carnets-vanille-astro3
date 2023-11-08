export async function getPageBySlug(slug: string, lang: string): Promise<Page | null> {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/pages/?slug=${slug}&lang=${lang}`
  )
  const page: Page[] = await res.json()

  return page.length > 0 ? page[0] : null
}

export type Page = {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: 'page'
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  sticky: boolean
  template: string
  acf: []
  yoast_head: string
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
