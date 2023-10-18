export async function getNodeByURI(uri: string) {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
          nodeByUri(uri: $uri) {
            __typename
            ... on Post {
              id
              languageCode
              translations {
                id
                languageCode
              }
            }
            ... on Page {
              id
              languageCode
              translations {
                id
                languageCode
              }
            }
            ... on Category {
              id
              languageCode
              translations {
                id
                languageCode
              }
            }
          }
        }
      `,
      variables: {
        uri: uri
      }
    })
  })
  const { data } = await response.json()
  return data.nodeByUri
}
