export function parseHtml(html: string) {
  html = replaceInternalLinks(html)

  return html
}

function replaceInternalLinks(html: string) {
  const firstReplace = html.replaceAll(
    `data-internal-link="true" href="${import.meta.env.BLOG_URL}`,
    `href="https://${import.meta.env.VERCEL_URL}`
  )

  return firstReplace.replaceAll(
    `data-internal-link="true" href="${import.meta.env.WORDPRESS_CMS_URL}`,
    `href="https://${import.meta.env.VERCEL_URL}`
  )
}

export function replaceUrls(html: string) {
  const firstReplace = html.replaceAll(
    import.meta.env.BLOG_URL,
    'https://' + import.meta.env.VERCEL_URL
  )

  return firstReplace.replaceAll(
    import.meta.env.WORDPRESS_CMS_URL,
    'https://' + import.meta.env.VERCEL_URL
  )
}
