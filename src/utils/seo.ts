import type { Post } from '../api/uri'

export const buildAlternates = (node: Post) => {
  if (node.translations.length === 0) return []
  const alternates = node.translations.map((translation) => {
    return {
      href: translation.guid,
      hrefLang: translation.language.language_code
    }
  })

  alternates.push({
    href: node.seo.canonical,
    hrefLang: node.language.language_code
  })

  alternates.push({
    href: node.seo.canonical,
    hrefLang: 'x-default'
  })

  return alternates
}
