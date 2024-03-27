import { createCommentHierarchy } from '../utils/comments'

const FETCH_PER_PAGE = 100 // Lower this number if it causes connection issues to your hosting. It cannot be greater than 100.

export async function getCommentsForPost(postId: number, lang: string = 'fr') {
  let page = 1

  let comments = await getRecursiveCommentsForPost(postId, lang, page)

  while (comments.length > 0 && comments.length % FETCH_PER_PAGE === 0) {
    page = page + 1
    const newComments = await getRecursiveCommentsForPost(postId, lang, page)
    comments = comments.concat(newComments)
  }

  return comments
}

const getRecursiveCommentsForPost = async (
  postId: number,
  lang: string,
  page: number
): Promise<Comment[]> => {
  const res = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL +
      `/comments/?per_page=${FETCH_PER_PAGE}&post=${postId}&lang=${lang}${
        page > 1 ? '&page=' + page : ''
      }`
  )
  const comments: Comment[] = await res.json()

  return createCommentHierarchy(comments)
}

export type Comment = {
  id: number
  post: number
  parent: number
  author: number
  author_name: string
  author_url: string
  date: string
  date_gmt: string
  children?: Comment[]
  content: {
    rendered: string
  }
  status: string
  modified: string
  modified_gmt: string
  type: 'comment'
  meta: {
    product_rating: number
  }
}
