import type { Seo } from './seo'

export async function getPostById(postId: number): Promise<Post> {
  console.log('====================================')
  console.log('Fetch Post by ID: ' + postId)
  console.log('====================================')

  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/posts/${postId}?_embed=wp:term,wp:featuredmedia`
  )
  const post: Post = await res.json()

  return post
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
    'wp:featuredmedia': any // Todo, type this
  }
  wpml_current_locale: string
  wpml_translations: any // Todo, type this
}
