import type { Seo } from './seo'

// For whatever reason, we need to query "posts" with a "where" condition including the language, instead of the single "post" with the ID, if we want to get the right tags and categories for the lang.

export async function getPostById(postId: number, lang: string = 'fr'): Promise<Post> {
  console.log('====================================')
  console.log('Fetch Post by ID: ' + postId + ' and lang: ' + lang)
  console.log('====================================')

  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query getPostById($postId: Int!, $language: String!) {
        posts(where: {id: $postId, language: $language}) {
          nodes {
            id
            title
            date
            uri
            excerpt
            content
            language {
                language_code
                default_locale
            }
            categories {
                nodes {
                  name
                  uri
                }
            }
            tags {
              nodes {
                name
                uri
              }
            }
            featuredImage {
              node {
                srcSet
                sourceUrl
                altText
                mediaDetails {
                  height
                  width
                }
              }
            }
            seo {
              canonical
              metaDesc
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphAuthor
              opengraphDescription
              opengraphModifiedTime
              opengraphPublishedTime
              opengraphPublisher
              opengraphSiteName
              opengraphTitle
              opengraphType
              opengraphUrl
              opengraphImage {
                guid
                mediaDetails {
                  height
                  width
                  sizes {
                    height
                    width
                  }
                }
                mediaType
                mediaItemUrl
                mediaItemId
                mimeType
              }
              readingTime
              title
            }
            translations {
              link
              language {
                language_code
              }
            }
          }
        }
      }
      `,
      variables: {
        postId: postId,
        language: lang
      }
    })
  })

  const { data } = await response.json()
  return data.posts.nodes[0]
}

export async function getPostByTagId(id: string, lang: string = 'fr'): Promise<PostTag[]> {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query getPostByTagId($tagId: String!, $language: String!) {
        posts(first: 100, where: {tagId: $tagId, language: $language}) {
          nodes {
            title
            uri
            featuredImage {
              node {
                srcSet
                sourceUrl
                altText
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        tagId: id,
        language: lang
      }
    })
  })
  const { data } = await response.json()
  return data.posts.nodes
}

export type PostTag = {
  uri: string
  title: string
  featuredImage: {
    node: {
      srcSet: string
      sourceUrl: string
      altText: string
      mediaDetails: {
        height: number
        width: number
      }
    }
  }
}

export type Post = {
  __typename: 'Post'
  id: string
  databaseId: number
  title: string
  date: string
  uri: string
  excerpt: string
  content: string
  categories: {
    nodes: {
      name: string
      uri: string
    }[]
  }
  tags: {
    nodes: {
      name: string
      uri: string
    }[]
  }
  featuredImage: {
    node: {
      srcSet: string
      sourceUrl: string
      altText: string
      mediaDetails: {
        height: number
        width: number
      }
    }
  }
  language: {
    language_code: string
    default_locale: string
  }
  seo: Seo
  translations: {
    link: string
    language: {
      language_code: string
    }
  }[]
}
