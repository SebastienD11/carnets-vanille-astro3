export type Post = {
  excerpt: string
  title: string
  uri: string
}

export async function homePagePostsQuery(lang: string = 'fr'): Promise<Post[]> {
  try {
    const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query getHomePost($lang: String!) {
                  posts(where: {language: $lang}) {
                    nodes {
                      date
                      uri
                      title
                      commentCount
                      excerpt
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
                    }
                  }
                }
              `,
        variables: {
          lang: lang
        }
      })
    })
    const { data } = await response.json()
    return data?.posts?.nodes
  } catch (error) {
    console.log('There was an error', error)
    return []
  }
}
