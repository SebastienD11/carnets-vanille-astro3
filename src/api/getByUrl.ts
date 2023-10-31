import { getCategoryBySlug, type Category } from './category'
import { getPostBySlug, type Post } from './post'
import { getTagBySlug, type Tag } from './tag'

export async function getResourceByUri(uri: string, lang: string): Promise<any> {
  console.log('====================================')
  console.log('Fetch Resource by URI: ' + uri)
  console.log('================')
  console.time('timer_uri')

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
      console.timeEnd('timer_uri')
      return tag
    }
  }

  // Note: In my personnal implementation, my categories doesn't have /category in the uri (thanks to some custom Yoast configruation)
  // It means that a Post and a Category could have the same slug.
  // Unfortunately, if that the case, this current logic doesn't have a way to differentiate the type only based on the URL.
  // Make sure to have a unique slug for each type.
  const category = await getCategoryBySlug(newUri, lang)

  if (category) {
    console.timeEnd('timer_uri')
    return category
  }

  const post = await getPostBySlug(newUri, lang)

  if (post) {
    console.timeEnd('timer_uri')
    return post
  }

  console.log('Nothing found :(')
  console.timeEnd('timer_uri')
  return null
}
