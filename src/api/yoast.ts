export async function getSEObyUrl(url: string, lang: string): Promise<string> {
  console.log('====================================')
  console.log('Fetch SEO by URL: ' + url)
  console.log('================')
  console.time('timer_seo')

  const res = await fetch(
    import.meta.env.WORDPRESS_INDEX_URL + `/wp-json/yoast/v1/get_head?url=${url}&lang=${lang}`
  )
  const seo = await res.json()
  console.timeEnd('timer_seo')

  return seo.html ? seo.html : ''
}
