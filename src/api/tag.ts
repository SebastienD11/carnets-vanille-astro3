export async function getTagById(tagId: number): Promise<Tag> {
  console.log('====================================')
  console.log('Fetch Tag by ID: ' + tagId)
  console.log('====================================')

  const res = await fetch(import.meta.env.WORDPRESS_REST_API_URL + `/tags/${tagId}`)
  const tag: Tag = await res.json()

  return tag
}

export type Tag = {
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
