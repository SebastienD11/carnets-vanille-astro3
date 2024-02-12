export type Yoast = {
  author: string
  title: string
  description: string
  canonical: string
  robots: {
    index: string
    follow: string
    maxImagePreview: string
    maxSnippet: string
    maxVideoPreview: string
  }
  og_locale: string
  og_type: string
  og_title: string
  og_description: string
  og_url: string
  og_site_name: string
  article_publisher: string
  article_published_time: string
  article_modified_time: string
  og_image: {
    url: string
    width: number
    height: number
    type: string
  }[]
  twitter_card: string
  twitter_creator: string
  twitter_site: string
  twitter_misc: any
  schema: any
}

export async function getSEObyUrl(url: string, lang: string): Promise<Yoast> {
  const res = await fetch(
    import.meta.env.WORDPRESS_INDEX_URL + `/wp-json/yoast/v1/get_head?url=${url}&lang=${lang}`
  )
  const seo = await res.json()
  return seo.json
}
