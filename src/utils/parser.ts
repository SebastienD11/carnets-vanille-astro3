export default function parseHtml(html: string) {
  // Replace all internal links with Astro app url
  return html.replaceAll(
    `data-internal-link="true" href="${import.meta.env.WORDPRESS_INDEX_URL}`,
    `href="https://${import.meta.env.VERCEL_URL}`
  )
}
