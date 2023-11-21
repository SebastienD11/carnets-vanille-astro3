import { CACHE_FOLDER } from '../constant'
import { cacheExist, getCache, writeCache } from '../utils/cache'

export async function getPostBySlug(slug: string, lang: string): Promise<Post | null> {
  if (cacheExist(`${CACHE_FOLDER}/${lang}/posts/${slug}.json`)) {
    return getCache(`${CACHE_FOLDER}/${lang}/posts/${slug}.json`)
  } else {
    const res = await fetch(
      import.meta.env.WORDPRESS_REST_API_URL + `/posts/?slug=${slug}&_embed=wp:term&lang=${lang}`
    )
    const post: Post[] = await res.json()

    if (post.length > 0) {
      writeCache(`${CACHE_FOLDER}/${lang}/posts/`, post[0].slug, post[0])
      return post[0]
    }

    return null
  }
}

export async function getPostById(id: number, lang: string): Promise<Post | null> {
  if (cacheExist(`${CACHE_FOLDER}/${lang}/postsUris.json`)) {
    const raw = getCache(`${CACHE_FOLDER}/${lang}/postsUris.json`)
    const post = raw.find((post: Post) => post.id === id)
    return getPostBySlug(post.slug, lang)
  }
  return null
}

export async function getPosts(lang: string, filter?: string): Promise<Post[]> {
  console.log('====================================')
  console.log('Fetch Posts for query: ' + lang + ' ' + filter)
  console.log('================')
  console.time('timer_post_by_query')

  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/posts/?_fields=id,slug&lang=${lang}${filter ? filter : ''}`
  )
  const posts: Post[] = await res.json()
  console.timeEnd('timer_post_by_query')

  return posts
}

export type Post = {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: 'post'
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
  featured_media_data: any
  comment_status: string
  sticky: boolean
  template: string
  format: string
  categories: number[]
  tags: number[]
  yoast_head: string
  _embedded: {
    'wp:term': any // Todo, type this
  }
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
  acf: {
    color: string
    mailerlite: string
    author_description: string
    related_posts: Post[]
    display_banner: boolean
  }
}
