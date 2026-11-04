// Turns the HTML stored in WordPress into what templates render.
import { decode } from 'html-entities'
import type { Node, Post } from './wordpress/types'

const siteUrl =
  import.meta.env.CUSTOM_ENV === 'production'
    ? import.meta.env.BUILD_URL
    : import.meta.env.CF_PAGES_URL || import.meta.env.BUILD_URL

function replaceInternalLinks(html: string) {
  return html
    .replaceAll(`data-internal-link="true" href="${import.meta.env.BLOG_URL}`, `href="${siteUrl}`)
    .replaceAll(
      `data-internal-link="true" href="${import.meta.env.WORDPRESS_CMS_URL}`,
      `href="${siteUrl}`
    )
}

export function replaceUrls(html: string) {
  return html
    .replaceAll(import.meta.env.BLOG_URL, siteUrl)
    .replaceAll(import.meta.env.WORDPRESS_CMS_URL, siteUrl)
}

const stripTags = (html: string) => decode(html.replace(/<[^>]*>/g, '')).trim()

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export type TocEntry = { id: string; text: string }
export type Segment = { type: 'html'; html: string } | { type: 'ebook-buy' } | { type: 'ebook-sample' }

const SHORTCODE =
  /(?:<p[^>]*>\s*)?<(\w+)\s+(shortcode_ebook_banner|shortcode_free_ebook_banner)[^>]*>\s*<\/\1>(?:\s*<\/p>)?/g

// Banners used to be swapped in by a browser script, which only filled the first placeholder
// of each kind. Splitting on the server renders all of them, with no layout jump.
function splitOnShortcodes(html: string): Segment[] {
  const segments: Segment[] = []
  let cursor = 0
  for (const match of html.matchAll(SHORTCODE)) {
    if (match.index > cursor) segments.push({ type: 'html', html: html.slice(cursor, match.index) })
    segments.push({ type: match[2] === 'shortcode_ebook_banner' ? 'ebook-buy' : 'ebook-sample' })
    cursor = match.index + match[0].length
  }
  if (cursor < html.length) segments.push({ type: 'html', html: html.slice(cursor) })
  return segments
}

// Gives every h2 an anchor (existing ids are kept, incoming links may rely on them) and lists them.
function addHeadingAnchors(html: string) {
  const toc: TocEntry[] = []
  const used = new Set<string>()
  const output = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_, attrs: string, inner: string) => {
    const text = stripTags(inner)
    const existing = attrs.match(/\sid="([^"]+)"/)?.[1]
    let id = existing ?? (slugify(text) || `section-${toc.length + 1}`)
    while (!existing && used.has(id)) id = `${id}-${toc.length + 1}`
    used.add(id)
    toc.push({ id, text })
    return existing ? `<h2${attrs}>${inner}</h2>` : `<h2 id="${id}"${attrs}>${inner}</h2>`
  })
  return { html: output, toc }
}

const lazyImages = (html: string) =>
  html.replace(/<img(?![^>]*\sloading=)/g, '<img loading="lazy" decoding="async"')

export function processContent(raw: string) {
  const { html, toc } = addHeadingAnchors(lazyImages(replaceInternalLinks(raw)))
  return { segments: splitOnShortcodes(html), toc }
}

// ---- Dates ----

const localeOf = (lang: string) => (lang === 'en' ? 'en-GB' : 'fr-FR')

export const formatDate = (date: string, lang: string) =>
  new Date(date).toLocaleDateString(localeOf(lang), { day: 'numeric', month: 'long', year: 'numeric' })

export const formatMonth = (date: string, lang: string) =>
  new Date(date).toLocaleDateString(localeOf(lang), { month: 'long', year: 'numeric' })

// ---- Featured images ----

export type Photo = { src: string; width: number; height: number; alt: string }

export function featuredPhoto(post: Post): Photo | null {
  const media = post.featured_media_data
  if (!media?.[0]) return null
  return {
    src: media[0],
    width: media[1],
    height: media[2],
    alt: media.alt || decode(post.title.rendered)
  }
}

// ---- SEO ----

export type Alternate = { hrefLang: string; href: string }

export function buildSeo(node: Node) {
  const alternates: Alternate[] = (node.wpml_translations ?? []).map((translation) => ({
    href: translation.href,
    hrefLang: translation.locale.substring(0, 2)
  }))
  if (alternates.length > 0) {
    alternates.push({ href: node.link, hrefLang: node.wpml_current_locale.substring(0, 2) })
  }
  return { yoast: node.yoast_head_json, alternates }
}

export const homeAlternates: Alternate[] = [
  { href: 'https://carnetsvanille.com/en/', hrefLang: 'en' },
  { href: 'https://carnetsvanille.com/', hrefLang: 'fr' }
]
