export type Post = {
  title: string
  excerpt: string
}

export async function homePagePostsQuery(): Promise<Post[]> {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
                  posts {
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
              `
    })
  })
  const { data } = await response.json()
  return data.posts.nodes
}
