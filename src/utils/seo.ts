import type { Node } from '../api/node'
const buildAlternates = (node: Node) => {
  if (node.wpml_translations.length === 0) return []

  const alternates = []
  node.wpml_translations.map((translation) => {
    alternates.push({
      href: translation.href,
      hrefLang: translation.locale.substring(0, 2)
    })
  })

  alternates.push({
    href: node.link,
    hrefLang: node.wpml_current_locale
  })

  return alternates
}

export const buildSeo = (node: Node) => {
  // Todo: Build alternates
  const alternates = buildAlternates(node)

  let ret = ''
  alternates?.map(
    (alternate) =>
      (ret += `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`)
  )

  ret += node.yoast_head

  return ret
}
