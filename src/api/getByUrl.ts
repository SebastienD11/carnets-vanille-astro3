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
              databaseId
              languageCode
              translations {
                id
                databaseId
                languageCode
              }
            }
            ... on Page {
              id
              languageCode
              translations {
                id
                databaseId
                languageCode
              }
            }
            ... on Tag {
              id
              languageCode
              translations {
                id
                databaseId
                languageCode
              }
            }
            ... on Category {
              id
              languageCode
              translations {
                id
                databaseId
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
