import type { Media } from './media'

export async function getPostBySlug(slug: string, lang: string): Promise<Post | null> {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/posts/?slug=${slug}&_embed=wp:term,wp:featuredmedia&lang=${lang}`
  )
  const post: Post[] = await res.json()

  return post.length > 0 ? post[0] : null
}

export async function getPosts(lang: string, filter?: string): Promise<Post[]> {
  console.log('====================================')
  console.log('Fetch Posts for query: ' + lang + ' ' + filter)
  console.log('================')
  console.time('timer_post_by_query')

  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/posts/?_embed=wp:term,wp:featuredmedia&lang=${lang}${filter ? filter : ''}`
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
  comment_status: string
  sticky: boolean
  template: string
  format: string
  categories: number[]
  tags: number[]
  acf: []
  yoast_head: string
  _embedded: {
    'wp:term': any // Todo, type this
    'wp:featuredmedia': Media[]
  }
  wpml_current_locale: string
  wpml_translations: {
    locale: string
    href: string
  }[]
}
