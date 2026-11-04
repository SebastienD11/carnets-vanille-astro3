// Everything about the site that is not stored in WordPress: navigation, identity copy, switches.
// Only link to pages that exist in the language. `npm run check:build` verifies this after a build.

export const FEATURES = {
  /**
   * Mobile bottom bar (Sommaire and Menu). Built, but off: the hamburger is the default.
   * Set to true to try it.
   */
  mobileBottomBar: false,
  /**
   * Small widget for Sarah to try the logo font and layout on the real site. Never shown on a
   * production build. Remove it, with public/logos/options/, once the choice is made.
   */
  designSettings: true
}

export const AUTHOR_PHOTO_ALT = 'Sarah Lagache'
const HERO_SAINT_MALO =
  'https://content.carnetsvanille.com/wp-content/uploads/2020/06/remparts-st-malo-bretagne.jpg'
const HERO_QUEBEC =
  'https://content.carnetsvanille.com/wp-content/uploads/2025/02/patinoire-parc-molson-montreal.jpg'

export type NavLink = { label: string; href: string }
export type AroundLink = { label: string; slug: string }

type TileIcon = 'compass' | 'utensils' | 'bed' | 'parking' | 'waves' | 'calendar' | 'castle' | 'pin'

type Site = {
  hero: { title: string; bio: string; image: string; imageAlt: string }
  /** Main navigation, shown in the desktop header and at the top of the mobile menu. */
  nav: NavLink[]
  /** Photo tiles at the top of the home page. Each photo comes from the post it links to. */
  tiles: (NavLink & { icon: TileIcon })[]
  around: AroundLink[]
  /** Secondary links on the home page and in the mobile menu. */
  more: NavLink[]
  footer: { title: string; links: NavLink[] }[]
  socials: NavLink[]
  legal: NavLink[]
  ebook: { href: string; title: string; text: string; points: string[]; cta: string } | null
  sarah: { title: string; text: string; link: NavLink }
  byline: string
  landingHero: Record<string, { image: string; alt: string }>
  mailerlite: {
    groups: { id: string; label: string }[]
    groupCommentEbook: string
    groupSampleEbook: string
  }
}

const socials: NavLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/carnetsvanille/' },
  { label: 'Facebook', href: 'https://www.facebook.com/carnetsvanille' },
  { label: 'Pinterest', href: 'https://www.pinterest.ca/carnetsvanille/' }
]

const CONTACT = 'mailto:sarah@carnetsvanille.com'

const fr: Site = {
  hero: {
    title: 'De retour à Saint-Malo',
    bio: "Moi c'est Sarah, Malouine de retour après 10 ans au Québec. Voici mes adresses et mes conseils pour profiter de la Côte d'Émeraude.",
    image: HERO_SAINT_MALO,
    imageAlt: 'Les remparts de Saint-Malo vus depuis la plage'
  },
  nav: [
    { label: 'Que faire', href: '/visiter-saint-malo-intra-muros/' },
    { label: 'Où manger', href: '/restaurants-saint-malo/' },
    { label: 'Où dormir', href: '/hebergements-saint-malo/' },
    { label: 'Se garer', href: '/se-garer-saint-malo/' },
    { label: 'Saint-Malo', href: '/saint-malo/' },
    { label: 'Au Québec', href: '/quebec/' }
  ],
  tiles: [
    { label: 'Que faire', href: '/visiter-saint-malo-intra-muros/', icon: 'compass' },
    { label: 'Où manger', href: '/restaurants-saint-malo/', icon: 'utensils' },
    { label: 'Où dormir', href: '/hebergements-saint-malo/', icon: 'bed' },
    { label: 'Où se garer', href: '/se-garer-saint-malo/', icon: 'parking' },
    { label: 'Les marées', href: '/grandes-marees-saint-malo/', icon: 'waves' },
    { label: 'Les événements', href: '/evenements-saint-malo/', icon: 'calendar' }
  ],
  around: [
    { label: 'Dinard', slug: 'visiter-dinard' },
    { label: 'Cancale', slug: 'visiter-cancale' },
    { label: 'Dinan', slug: 'visiter-dinan' },
    { label: 'Mont-Saint-Michel', slug: 'visite-mont-saint-michel-conseils' },
    { label: 'Cap Fréhel', slug: 'cap-frehel' },
    { label: 'Saint-Suliac', slug: 'visiter-saint-suliac' }
  ],
  more: [
    { label: 'Ma boutique, Marée Haute Marée Basse', href: '/ma-boutique-saint-malo-maree-haute-maree-basse/' },
    { label: 'Mes 10 ans au Québec', href: '/quebec/' },
    { label: "Et d'ailleurs", href: '/decouvrir-le-monde/' }
  ],
  footer: [
    {
      title: 'Préparer votre visite à Saint-Malo',
      links: [
        { label: 'Que faire', href: '/visiter-saint-malo-intra-muros/' },
        { label: 'Où manger', href: '/restaurants-saint-malo/' },
        { label: 'Où dormir', href: '/hebergements-saint-malo/' },
        { label: 'Où se garer', href: '/se-garer-saint-malo/' }
      ]
    },
    {
      title: 'Carnets Vanille',
      links: [
        { label: "L'ebook", href: '/ebook-saint-malo/' },
        { label: 'Ma boutique', href: '/ma-boutique-saint-malo-maree-haute-maree-basse/' },
        { label: "Québec, et d'ailleurs", href: '/quebec/' },
        { label: 'Partenariat', href: CONTACT }
      ]
    }
  ],
  socials,
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales/' },
    { label: 'Contact', href: CONTACT }
  ],
  ebook: {
    href: '/ebook-saint-malo/',
    title: 'Tout mon Saint-Malo dans votre poche',
    text: "Mon ebook sur Saint-Malo et la Côte d'Émeraude, à garder sur votre téléphone pendant le séjour.",
    points: ['Mes conseils de visite', "Des suggestions d'itinéraires", 'Des anecdotes sur la ville'],
    cta: "Découvrir l'ebook"
  },
  sarah: {
    title: "Moi c'est Sarah",
    text: 'Malouine de retour à Saint-Malo après 10 ans au Québec. Je teste, je marche, je goûte, et je vous partage mes vraies adresses.',
    link: { label: 'Me suivre sur Instagram', href: 'https://www.instagram.com/carnetsvanille/' }
  },
  byline: 'Par Sarah, Malouine',
  landingHero: {
    'saint-malo': { image: HERO_SAINT_MALO, alt: 'Les remparts de Saint-Malo vus depuis la plage' },
    quebec: { image: HERO_QUEBEC, alt: 'Patinoire du parc Molson à Montréal' }
  },
  mailerlite: {
    groups: [
      { id: '88968404275299938', label: 'Saint-Malo et la Bretagne' },
      { id: '88968404285785703', label: "Le Québec et la vie d'expat' à Montréal" }
    ],
    groupCommentEbook: '88968404275299938',
    groupSampleEbook: '88968404289980009'
  }
}

// English shows only what exists in English: no ebook, no restaurant guide, no shop.
const en: Site = {
  hero: {
    title: 'Back in Saint-Malo',
    bio: "I'm Sarah, from Saint-Malo, back after 10 years in Québec. Here are my favorite places and tips for enjoying the Emerald Coast.",
    image: HERO_SAINT_MALO,
    imageAlt: 'The ramparts of Saint-Malo seen from the beach'
  },
  nav: [
    { label: 'Things to do', href: '/en/things-to-do-in-st-malo/' },
    { label: 'Where to stay', href: '/en/st-malo-places-to-stay/' },
    { label: 'Parking', href: '/en/parking-saint-malo/' },
    { label: 'Tides', href: '/en/saint-malo-tides/' },
    { label: 'Saint-Malo', href: '/en/saint-malo/' },
    { label: 'Québec', href: '/en/quebec/' }
  ],
  tiles: [
    { label: 'Things to do', href: '/en/things-to-do-in-st-malo/', icon: 'compass' },
    { label: 'Where to stay', href: '/en/st-malo-places-to-stay/', icon: 'bed' },
    { label: 'Parking', href: '/en/parking-saint-malo/', icon: 'parking' },
    { label: 'Tides', href: '/en/saint-malo-tides/', icon: 'waves' },
    { label: 'The forts', href: '/en/saint-malo-forts/', icon: 'castle' },
    { label: 'Emerald Coast', href: '/en/emerald-coast-brittany-france/', icon: 'pin' }
  ],
  around: [
    { label: 'Dinard', slug: 'visit-dinard-france' },
    { label: 'Cancale', slug: 'visit-cancale-france' },
    { label: 'Dinan', slug: 'visit-dinan-brittany' },
    { label: 'Mont-Saint-Michel', slug: 'things-to-do-mont-saint-michel' },
    { label: 'Cap Fréhel', slug: 'cap-frehel-france' }
  ],
  more: [
    { label: 'To Québec', href: '/en/quebec/' },
    { label: 'Further afield', href: '/en/discovering-the-world/' }
  ],
  footer: [
    {
      title: 'Plan your visit to Saint-Malo',
      links: [
        { label: 'Things to do', href: '/en/things-to-do-in-st-malo/' },
        { label: 'Where to stay', href: '/en/st-malo-places-to-stay/' },
        { label: 'Parking', href: '/en/parking-saint-malo/' },
        { label: 'Tides', href: '/en/saint-malo-tides/' }
      ]
    },
    {
      title: 'Carnets Vanille',
      links: [
        { label: 'Saint-Malo', href: '/en/saint-malo/' },
        { label: 'Québec', href: '/en/quebec/' },
        { label: 'Further afield', href: '/en/discovering-the-world/' },
        { label: 'Partnership', href: CONTACT }
      ]
    }
  ],
  socials,
  legal: [
    { label: 'Legal information', href: '/en/legal-information/' },
    { label: 'Contact', href: CONTACT }
  ],
  ebook: null,
  sarah: {
    title: "I'm Sarah",
    text: "From Saint-Malo, back after 10 years in Québec. I try, I walk, I taste, and I share the places I really recommend.",
    link: { label: 'Follow me on Instagram', href: 'https://www.instagram.com/carnetsvanille/' }
  },
  byline: 'By Sarah, from Saint-Malo',
  landingHero: {},
  mailerlite: {
    groups: [
      { id: '88968404275299938', label: 'Saint-Malo and Brittany' },
      { id: '88968404285785703', label: 'Québec and expat life in Montréal' }
    ],
    groupCommentEbook: '88968404275299938',
    groupSampleEbook: '88968404289980009'
  }
}

export const getSite = (lang: string): Site => (lang === 'en' ? en : fr)
