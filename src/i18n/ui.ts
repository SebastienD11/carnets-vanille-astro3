// Copy the i18n values from astro config here.
// It's easier this way for typing than working with the i18n Config from Astro.
export const locales = ['en', 'fr']
const defaultLocale = 'fr'

export function useTranslations(lang: keyof typeof ui = defaultLocale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key]
  }
}

export const ui = {
  en: {
    'index.recentsPost.title': 'Recent Posts',
    'tag.grid.title': 'Tag: ',
    'category.grid.title': 'Category: ',
    'post.relatedPost.title': 'Related Posts',
    'post.comments.title': 'Comments'
  },
  fr: {
    'index.recentsPost.title': 'Articles récents',
    'tag.grid.title': 'Tag : ',
    'category.grid.title': 'Catégorie : ',
    'post.relatedPost.title': 'Articles similaires',
    'post.comments.title': 'Commentaires'
  }
} as const
