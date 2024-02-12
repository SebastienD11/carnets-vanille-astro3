import type { Node } from '../api/node'
const buildAlternates = (node: Node) => {
  if (!node.wpml_translations || node.wpml_translations.length === 0) return []

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

// Todo : Do better than this
export const buildIndexAlternates = () => {
  return [
    {
      href: 'https://carnetsvanille.com/en/',
      hrefLang: 'en'
    },
    {
      href: 'https://carnetsvanille.com/',
      hrefLang: 'fr'
    }
  ]
}

export const buildSeo = (node: Node) => {
  const seo = {
    yoast: node.yoast_head_json,
    alternates: buildAlternates(node)
  }

  return seo
}
