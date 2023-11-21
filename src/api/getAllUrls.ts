import { CACHE_FOLDER, POSTS_PER_PAGE } from '../constant'
import { cacheExist, getCache, writeCache } from '../utils/cache'
import type { Category } from './category'
import type { Page } from './page'
import type { Post } from './post'
import type { Tag } from './tag'

type Uri = {
  params: {
    uri: string
  }
}

const FETCH_PER_PAGE = 100 // Lower this number if it causes connection issues to your hosting. It cannot be greater than 100.

/*****************
 *
 *  NOTE
 *  REST API will default to status : published for Post and Pages
 *
 *****************/

export async function getAllUris(lang: string = 'fr') {
  console.log('====================================')
  console.log('Fetch all URIS for lang : ' + lang)
  console.log('================')
  console.time('timer_urls')

  const pages = await getAllPagesUrils(lang)

  // Posts
  let posts: Post[] = []
  if (cacheExist(`${CACHE_FOLDER}/${lang}/postsUri.json`)) {
    posts = getCache(`${CACHE_FOLDER}/${lang}/postsUri.json`)
  } else {
    posts = await getAllPostsUrils(lang)
    writeCache(`${CACHE_FOLDER}/${lang}/`, 'postsUris', posts)
  }

  const postUris: Uri[] = posts.map((post: Post) => {
    return {
      params: {
        uri: post.slug
      }
    }
  })

  const tags = await getAllTagsUrils(lang)
  const categories = await getAllCategoriesUrils(lang)

  let uris: any[] = pages
  uris = uris.concat(postUris)
  uris = uris.concat(tags)
  uris = uris.concat(categories)
  console.timeEnd('timer_urls')

  return uris
}

/*****************
 *
 *  PAGES
 *  Published, by bucket of 100
 *
 *****************/

const getAllPagesUrils = async (lang: string) => {
  let page = 1
  let pages = await recursivePageFetch(lang, page)

  while (pages.length > 0 && pages.length % FETCH_PER_PAGE === 0) {
    page = page + 1
    const newPages = await recursivePageFetch(lang, page)
    pages = pages.concat(newPages)
  }

  const pagesUris: Uri[] = pages.map((page: Page) => {
    return {
      params: {
        uri: page.slug
      }
    }
  })

  return pagesUris
}

const recursivePageFetch = async (lang: string, page: number) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/pages?per_page=${FETCH_PER_PAGE}&_fields=slug,id&lang=${lang}${
        page > 1 ? '&page=' + page : ''
      }`
  )
  const pages: Page[] = await res.json()
  return pages
}

/*****************
 *
 *  POSTS
 *  Published, by bucket of 100
 *
 *****************/

const getAllPostsUrils = async (lang: string) => {
  let page = 1
  let posts = await recursivePostFetch(lang, page)

  while (posts.length > 0 && posts.length % FETCH_PER_PAGE === 0) {
    page = page + 1
    const newPosts = await recursivePostFetch(lang, page)
    posts = posts.concat(newPosts)
  }

  return posts
}

const recursivePostFetch = async (lang: string, page: number) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/posts?per_page=${FETCH_PER_PAGE}&_fields=slug,id&lang=${lang}${
        page > 1 ? '&page=' + page : ''
      }`
  )
  const posts: Post[] = await res.json()
  return posts
}

/*****************
 *
 *  Tags
 *  With pagination sub pages, by bucket of 100
 *
 *****************/

const getAllTagsUrils = async (lang: string) => {
  let page = 1
  let tags = await recursiveTagsFetch(lang, page)

  while (tags.length > 0 && tags.length % FETCH_PER_PAGE === 0) {
    page = page + 1
    const newTags = await recursiveTagsFetch(lang, page)
    tags = tags.concat(newTags)
  }

  const tagsUris: Uri[] = []
  tags.map((tag: Tag) => {
    tagsUris.push({
      params: {
        uri: 'tag/' + tag.slug
      }
    })
    let pages = Math.ceil(tag.count / POSTS_PER_PAGE)
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

const recursiveTagsFetch = async (lang: string, page: number) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/tags?per_page=${FETCH_PER_PAGE}&_fields=slug,count&lang=${lang}${
        page > 1 ? '&page=' + page : ''
      }`
  )
  const tags: Tag[] = await res.json()
  return tags
}

/*****************
 *
 *  Categories
 *  With pagination sub pages, by bucket of 100
 *
 *****************/

const getAllCategoriesUrils = async (lang: string) => {
  let page = 1
  let categories = await recursiveCategoriesFetch(lang, page)

  while (categories.length > 0 && categories.length % FETCH_PER_PAGE === 0) {
    page = page + 1
    const newCategories = await recursiveCategoriesFetch(lang, page)
    categories = categories.concat(newCategories)
  }

  const categoriesUris: Uri[] = []
  categories.map((category: Category) => {
    categoriesUris.push({
      params: {
        uri: category.slug
      }
    })
    let pages = Math.ceil(category.count / POSTS_PER_PAGE)
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

const recursiveCategoriesFetch = async (lang: string, page: number) => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/categories?per_page=${FETCH_PER_PAGE}&_fields=slug,count&lang=${lang}${
        page > 1 ? '&page=' + page : ''
      }`
  )
  const categories: Category[] = await res.json()
  return categories
}
