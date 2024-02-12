import { CACHE_FOLDER } from '../constant'
import { cacheExist, getCache, writeCache } from '../utils/cache'

export async function getCategoryBySlug(slug: string, lang: string): Promise<Category | null> {
  if (cacheExist(`${CACHE_FOLDER}/${lang}/categories/${slug}.json`)) {
    return getCache(`${CACHE_FOLDER}/${lang}/categories/${slug}.json`)
  } else {
    const res = await fetch(
      import.meta.env.WORDPRESS_REST_API_URL + `/categories/?slug=${slug}&lang=${lang}`
    )
    const category: Category[] = await res.json()

    if (category.length > 0) {
      writeCache(`${CACHE_FOLDER}/${lang}/categories/`, category[0].slug, category[0])
      return category[0]
    }

    return null
  }
}

export type Category = {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'category'
  yoast_head_json: any
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
