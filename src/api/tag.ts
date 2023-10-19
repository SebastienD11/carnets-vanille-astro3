import type { Seo } from './seo'

export async function getTagById(id: string): Promise<Tag> {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query getTagById($id: ID!) {
          tag(id: $id) {
            id
            name
            uri
            description
            language {
              language_code
              default_locale
            }
            seo {
              canonical
              metaDesc
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphAuthor
              opengraphDescription
              opengraphSiteName
              opengraphTitle
              opengraphType
              opengraphUrl
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
      `,
      variables: {
        id: id
      }
    })
  })
  const { data } = await response.json()

  return data.tag
}

export type Tag = {
  __typename: 'Tag'
  id: string
  name: string
  uri: string
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
