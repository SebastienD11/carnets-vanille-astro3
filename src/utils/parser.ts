export function parseHtml(html: string) {
  html = replaceInternalLinks(html)

  return html
}

function replaceInternalLinks(html: string) {
  return html.replaceAll(`data-internal-link="true" href="${import.meta.env.WORDPRESS_INDEX_URL}`, `href="https://${import.meta.env.VERCEL_URL}`)
}

export function replaceEnvUrls(input: string) {
  // Replace all internal links with Astro app url
  return input.replaceAll(import.meta.env.WORDPRESS_INDEX_URL, `https://${import.meta.env.VERCEL_URL}`)
}
