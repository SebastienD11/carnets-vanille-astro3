export async function getAllUris(lang: string = 'fr') {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query GetAllUris($lang: String!) {
          posts(first: 20, where: {language: $lang}) {
            nodes {
              uri
            }
          }
        }`,
      variables: {
        lang: lang
      }
    })
  })
  const { data } = await response.json()

  const uris = Object.values(data)
    .reduce(function (acc, currentValue) {
      return acc.concat(currentValue.nodes)
    }, [])
    .filter((node) => node.uri !== null)
    .map((node) => {
      let trimmedURI = node.uri.substring(1)
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1)

      // Remove `en/ and fr/ from the URI to allow the right path at build time
      // en/ Page are already within a /en folder`
      trimmedURI = trimmedURI.replace('en/', '')
      trimmedURI = trimmedURI.replace('fr/', '')
      return {
        params: {
          uri: trimmedURI
        }
      }
    })

  return uris
}
