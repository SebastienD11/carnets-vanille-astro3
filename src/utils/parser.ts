import { parse } from 'node-html-parser'

export function parseHtml(html: string) {
  html = replaceInternalLinks(html)
  html = replaceFreeBookShortcode(html)

  return html
}

function replaceInternalLinks(html: string) {
  return html.replaceAll(
    `data-internal-link="true" href="${import.meta.env.WORDPRESS_INDEX_URL}`,
    `href="https://${import.meta.env.VERCEL_URL}`
  )
}

function replaceFreeBookShortcode(html: string) {
  const parsedHtml = parse(html)
  parsedHtml.querySelector('[shortcode_free_ebook_banner]')?.replaceWith('FREE EBOOK BANNER')

  return parsedHtml.toString()
}

export function replaceEnvUrls(input: string) {
  // Replace all internal links with Astro app url
  return input.replaceAll(
    import.meta.env.WORDPRESS_INDEX_URL,
    `https://${import.meta.env.VERCEL_URL}`
  )
}
