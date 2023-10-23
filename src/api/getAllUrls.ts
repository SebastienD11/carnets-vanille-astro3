type Node = {
  slug: string
}

// Todo:
// - While loop to get all post (REST API limit to 100 posts per query)

export async function getAllUris(lang: string = 'fr') {
  console.log('====================================')
  console.log('Fetch all URIS for lang : ' + lang)
  console.log('================')
  console.time('timer_urls')

  const posts = await getAllPostsUrils(lang)
  const tags = await getAllTagsUrils(lang)

  let data: Node[] = posts
  data = data.concat(tags)
  console.timeEnd('timer_urls')

  const uris = data.map((node: Node) => {
    return {
      params: {
        uri: node.slug
      }
    }
  })

  return uris
}

const getAllPostsUrils = async (lang: string) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/posts?per_page=100&_fields=slug&lang=${lang}`
  )
  const posts: Node[] = await res.json()
  return posts
}

const getAllTagsUrils = async (lang: string) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/tags?per_page=100&_fields=slug&lang=${lang}`
  )
  const tags: Node[] = await res.json()

  tags.map((tag: Node) => {
    tag.slug = 'tag/' + tag.slug
  })

  return tags
}
