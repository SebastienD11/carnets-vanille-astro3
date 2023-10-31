export async function getCategoryBySlug(slug: string, lang: string): Promise<Category | null> {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/categories/?slug=${slug}&lang=${lang}`
  )
  const category: Category[] = await res.json()

  return category.length > 0 ? category[0] : null
}

export type Category = {
  id: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'category'
  yoast_head: string
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
