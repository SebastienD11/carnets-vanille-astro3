import type { Seo } from './seo'

export async function getNodeByURI(uri: string) {
  // Handle the case where the URI is a category
  let newUri = uri.replace('categorie/', '')
  newUri = newUri.replace('en/', '')
  newUri = newUri.replace('fr/', '')

  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
          nodeByUri(uri: $uri) {
            __typename
            isContentNode
            isTermNode
            ... on Post {
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
                guid
                language {
                  language_code
                }
              }
            }
            ... on Page {
              id
              title
              uri
              date
              content
            }
            ... on Category {
              id
              name
            }
          }
        }
      `,
      variables: {
        uri: newUri
      }
    })
  })
  const { data } = await response.json()
  return data
}

export type Post = {
  __typename: 'Post'
  id: string
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
    guid: string
    language: {
      language_code: string
    }
  }[]
}
