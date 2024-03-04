import { getCategoryBySlug, type Category } from './category'
import { getPageBySlug } from './page'
import { getPostBySlug, getPostPreviewById, type Post } from './post'
import { getTagBySlug, type Tag } from './tag'

export async function getResourceByUri(uri: string, lang: string): Promise<any> {
  // We retreive only the part of the URL that we care about : the resource's slug
  const urlSplitByPage = uri.split('/page/')
  const splitUri = urlSplitByPage[0].split('/')
  const newUri =
    splitUri[splitUri.length - 1] === ''
      ? splitUri[splitUri.length - 2]
      : splitUri[splitUri.length - 1]

  if (uri.includes('tag/')) {
    // We only look for tag if the uri includes 'tag/'
    const tag = await getTagBySlug(newUri, lang)

    if (tag) {
      return tag
    }
  }

  const page = await getPageBySlug(newUri, lang)

  if (page) {
    return page
  }

  // Note: In my personnal implementation, my categories doesn't have /category in the uri (thanks to some custom Yoast configruation)
  // It means that a Post and a Category could have the same slug.
  // Unfortunately, if that the case, this current logic doesn't have a way to differentiate the type only based on the URL.
  // Make sure to have a unique slug for each type.
  const category = await getCategoryBySlug(newUri, lang)

  if (category) {
    return category
  }

  const post = await getPostBySlug(newUri, lang)

  if (post) {
    return post
  }

  return null
}

export async function getPreviewResource(id: number, type: string) {
  if (type === 'post') return getPostPreviewById(id)
}
