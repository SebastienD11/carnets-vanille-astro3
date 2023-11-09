export default function parseHtml(html: string) {
  // Replace all internal links with Astro app url
  return html.replace(
    `data-internal-link="true" href="${import.meta.env.WORDPRESS_INDEX_URL}`,
    `href="${import.meta.env.WORDPRESS_ASTRO_APP_VERCEL_URL}`
  )
}
