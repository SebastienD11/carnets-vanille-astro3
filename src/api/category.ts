export async function getCategoryById(categoryId: number): Promise<Category> {
  console.log('====================================')
  console.log('Fetch Category by ID: ' + categoryId)
  console.log('================')
  console.time('timer_category')

  const res = await fetch(import.meta.env.WORDPRESS_REST_API_URL + `/categories/${categoryId}`)
  const category: Category = await res.json()
  console.timeEnd('timer_category')

  return category
}

export type Category = {
  id: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  yoast_head: string
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
