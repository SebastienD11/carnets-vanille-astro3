import { CACHE_FOLDER } from '../constant'
import { cacheExist, getCache, writeCache } from '../utils/cache'

export async function getTagBySlug(slug: string, lang: string): Promise<Tag | null> {
  if (cacheExist(`${CACHE_FOLDER}/${lang}/tags/${slug}.json`)) {
    return getCache(`${CACHE_FOLDER}/${lang}/tags/${slug}.json`)
  } else {
    const res = await fetch(
      import.meta.env.WORDPRESS_REST_API_URL + `/tags/?slug=${slug}&lang=${lang}`
    )
    const tag: Tag[] = await res.json()

    if (tag.length > 0) {
      writeCache(`${CACHE_FOLDER}/${lang}/tags/`, tag[0].slug, tag[0])
      return tag[0]
    }

    return null
  }
}

export type Tag = {
  id: number
  count: number
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
