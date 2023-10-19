import type { Node } from '../api/node'

const buildAlternates = (node: Node) => {
  if (node.translations.length === 0) return []
  const alternates = node.translations.map((translation) => {
    return {
      href: translation.link,
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

export const buildSeo = (node: Node) => {
  return {
    alternates: buildAlternates(node),
    canonical: node.seo.canonical,
    metaDesc: node.seo.metaDesc,
    metaRobotsNofollow: node.seo.metaRobotsNofollow,
    metaRobotsNoindex: node.seo.metaRobotsNoindex,
    opengraphAuthor: node.seo.opengraphAuthor,
    opengraphDescription: node.seo.opengraphDescription,
    opengraphModifiedTime: node.seo.opengraphModifiedTime,
    opengraphPublishedTime: node.seo.opengraphPublishedTime,
    opengraphPublisher: node.seo.opengraphPublisher,
    opengraphSiteName: node.seo.opengraphSiteName,
    opengraphTitle: node.seo.opengraphTitle,
    opengraphType: node.seo.opengraphType,
    opengraphUrl: node.seo.opengraphUrl,
    opengraphLocale: node.language.default_locale,
    opengraphImage: node.seo.opengraphImage,
    readingTime: node.seo.readingTime,
    title: node.seo.title
  }
}
