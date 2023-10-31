import { PER_PAGE } from '../constant'
import type { Category } from './category'
import type { Post } from './post'
import type { Tag } from './tag'

type Uri = {
  params: {
    uri: string
  }
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
  const categories = await getAllCategoriesUrils(lang)

  let uris: any[] = posts
  uris = uris.concat(tags)
  uris = uris.concat(categories)
  console.timeEnd('timer_urls')

  return uris
}

const getAllPostsUrils = async (lang: string) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/posts?per_page=100&_fields=slug&lang=${lang}`
  )
  const posts: Post[] = await res.json()
  const postUris: Uri[] = posts.map((post: Post) => {
    return {
      params: {
        uri: post.slug
      }
    }
  })
  return postUris
}

const getAllTagsUrils = async (lang: string) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/tags?per_page=100&_fields=slug,count&lang=${lang}`
  )
  const tags: Tag[] = await res.json()
  const tagsUris: Uri[] = []

  tags.map((tag: Tag) => {
    tagsUris.push({
      params: {
        uri: 'tag/' + tag.slug
      }
    })
    let pages = Math.ceil(tag.count / PER_PAGE)
    while (pages > 1) {
      tagsUris.push({
        params: {
          uri: 'tag/' + tag.slug + '/page/' + pages
        }
      })
      pages = pages - 1
    }
  })

  return tagsUris
}

const getAllCategoriesUrils = async (lang: string) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/categories?per_page=100&_fields=slug,count&lang=${lang}`
  )
  const categories: Category[] = await res.json()
  const categoriesUris: Uri[] = []

  categories.map((category: Category) => {
    categoriesUris.push({
      params: {
        uri: category.slug
      }
    })
    let pages = Math.ceil(category.count / PER_PAGE)
    while (pages > 1) {
      categoriesUris.push({
        params: {
          uri: category.slug + '/page/' + pages
        }
      })
      pages = pages - 1
    }
  })

  return categoriesUris
}
