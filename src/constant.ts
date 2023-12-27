export const CACHE_FOLDER = './.cache'
export const POSTS_PER_PAGE = 11
export const ADMIN_USER_ID = 2
export const ADMIN_EMAIL = 'sarah@carnetsvanille.com'

export const MAILERLITE_GROUPS = [
  { id: '88968404275299938', name: 'Saint-Malo et la Bretagne' },
  { id: '88968404285785703', name: "Le Québec et la vie d'expat à Montréal" },
  { id: '88968404289980009', name: 'Ebook - Extrait' }
]

export const primaryMenu = [
  {
    lang: 'fr',
    items: [
      {
        title: 'De Saint-Malo',
        slug: 'saint-malo',
        icon: 'triskell'
      },
      {
        title: 'Au Québec',
        slug: 'quebec',
        icon: 'erable'
      },
      {
        title: 'Et d’ailleurs',
        slug: 'decouvrir-le-monde',
        icon: 'plane'
      }
    ]
  },
  {
    lang: 'en',
    items: []
  }
]

export const footerMenu = [
  {
    lang: 'fr',
    items: [
      {
        title: 'Mentions légales',
        slug: 'mentions-legales'
      },
      {
        title: 'Contact',
        url: 'mailto:sarah@carnetsvanille.com'
      },
      {
        title: 'Partenariat',
        url: 'mailto:sarah@carnetsvanille.com'
      }
    ]
  },
  {
    lang: 'en',
    items: [
      {
        title: 'Legal information',
        slug: 'legal-information'
      },
      {
        title: 'Contact',
        url: 'mailto:sarah@carnetsvanille.com'
      },
      {
        title: 'Partnership',
        url: 'mailto:sarah@carnetsvanille.com'
      }
    ]
  }
]
