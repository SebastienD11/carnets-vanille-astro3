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
    'card.date.modified': 'Last modified on: ',
    'category.grid.title': 'Category: ',
    'index.posts.title': "Carnets Vanille's latest posts",
    'index.title': 'Welcome',
    'offCanvas.socialLinks.title': 'Follow me on ',
    'post.comments.title': 'Comments',
    'post.comments.subtitle': "Leave me a comment, i'll reply as soon as possible!",
    'post.relatedPost.title': 'Related Posts',
    'socialLinks.facebook.alt': 'Follow me on Facebook',
    'socialLinks.instagram.alt': 'Follow me on Instagram',
    'socialLinks.pinterest.alt': 'Follow me on Pinterest',
    'socialLinks.twitter.alt': 'Follow me on Twitter',
    'tag.grid.title': 'Tag: '
  },
  fr: {
    'card.date.modified': 'Mise à jour le ',
    'category.grid.title': 'Catégorie : ',
    'index.posts.title': 'Mes derniers articles sur Carnets Vanille',
    'index.title': 'Bienvenue',
    'offCanvas.socialLinks.title': 'Suivez-moi sur :',
    'post.comments.title': 'Commentaires',
    'post.comments.subtitle': 'N’hésitez pas à me laisser un commentaire !',
    'post.relatedPost.title': 'Articles similaires',
    'socialLinks.facebook.alt': 'Suivez-moi sur Facebook',
    'socialLinks.instagram.alt': 'Suivez-moi sur Instagram',
    'socialLinks.pinterest.alt': 'Suivez-moi sur Pinterest',
    'socialLinks.twitter.alt': 'Suivez-moi sur Twitter',
    'tag.grid.title': 'Tag : '
  }
} as const
