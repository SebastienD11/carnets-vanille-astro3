export async function getAllUris(lang: string = 'fr') {
  const response = await fetch(
    import.meta.env.WORDPRESS_REST_API_URL + `/posts?per_page=100&_fields=slug&lang=${lang}`
  )
  const data = await response.json()

  const uris = data.map((node) => {
    return {
      params: {
        uri: node.slug
      }
    }
  })

  console.log(lang + ` uris posts`)
  console.log(uris)

  return uris
}
