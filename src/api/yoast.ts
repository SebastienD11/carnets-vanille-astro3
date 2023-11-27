export async function getSEObyUrl(url: string, lang: string): Promise<string> {
  const res = await fetch(
    import.meta.env.WORDPRESS_INDEX_URL + `/wp-json/yoast/v1/get_head?url=${url}&lang=${lang}`
  )
  const seo = await res.json()
  return seo.html ? seo.html : ''
}
