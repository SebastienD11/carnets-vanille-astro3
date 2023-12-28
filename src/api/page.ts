export async function getPageBySlug(slug: string, lang: string): Promise<Page | null> {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/pages/?slug=${slug}&lang=${lang}&acf_format=standard`
  )
  const page: Page[] = await res.json()

  return page.length > 0 ? page[0] : null
}

type PageSection = {
  section_title: string
  section_icon: string
  section_intro: string
  section_banner: boolean
  section_banner_image: {
    ID: number
    id: number
    title: string
    filename: string
    filesize: number
    url: string
    link: string
    alt: string
    author: string
    description: string
    caption: string
    name: string
    status: string
    uploaded_to: number
    date: string
    modified: string
    menu_order: number
    mime_type: string
    type: string
    subtype: string
    icon: string
    width: number
    height: number
    sizes: any[]
  }
  section_banner_text: string
  section_banner_link: {
    title: string
    url: string
    target: string
  }
  section_articles: {
    ID: number
  }[]
  section_read_more_label: string
  section_read_more_link: {
    title: string
    url: string
    target: string
  }
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
  acf: {
    introduction_title: string
    introduction_intro: string
    banner_ebook: boolean
    sections: PageSection[]
    template: string
  }
  yoast_head: string
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
