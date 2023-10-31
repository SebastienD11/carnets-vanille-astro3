export async function getTagBySlug(slug: string, lang: string): Promise<Tag | null> {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/tags/?slug=${slug}&lang=${lang}`
  )
  const tag: Tag[] = await res.json()

  return tag.length > 0 ? tag[0] : null
}

export type Tag = {
  id: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'post_tag'
  yoast_head: string
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
