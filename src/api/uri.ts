export async function getNodeByURI(uri: string) {
  // Handle the case where the URI is a category
  const newUri = uri.replace('categorie/', '')

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
                        posts {
                            nodes {
                            date
                            title
                            excerpt
                            uri
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
