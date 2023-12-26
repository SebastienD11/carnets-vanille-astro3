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
    'newsletter.card.label': 'Subscribe now!',
    'newsletter.card.subtitle': 'I regularly send out my good tips and discoveries!',
    'newsletter.card.title': 'Would you like to receive information about Saint-Malo or Quebec?',
    'newsletter.footer.copy':
      'By subscribing to my Saint-Malo newsletters, you will receive a <strong>free</strong> extract from my ebook on Saint-Malo! You can unsubscribe at any time, with one click.',
    'newsletter.form.email': 'Your email address',
    'newsletter.form.firstName': 'Your name',
    'newsletter.form.submit': 'Subscribe',
    'newsletter.form.loading': 'Sending...',
    'newsletter.form.error':
      'At least one fields is missing or incorrect. If something feels wrong, please contact me directly at : ',
    'newsletter.form.success': 'Thank you :) Be sure to monitor your inbox to not miss anything!',
    'newsletter.header.subtitle':
      'Are you interested in Brittany?<br />Or do you want to find out more about Quebec?<br />Maybe both? The choice is yours!',
    'newsletter.header.title': 'Subscribe to my newsletters!',
    'offCanvas.socialLinks.title': 'Follow me on ',
    'post.comments.subtitle': "Leave me a comment, i'll reply as soon as possible!",
    'post.comments.title': 'Comments',
    'post.comments.form.comment': 'Write a comment',
    'post.comments.form.email': 'Email',
    'post.comments.form.errors.fields': 'Oups, at least one of the required field is incorrect!',
    'post.comments.form.firstName': 'First Name',
    'post.comments.form.loading': 'Sending...',
    'post.comments.form.submit': 'Submit',
    'post.comments.form.subtitle': "I'll reply as soon as possible!",
    'post.comments.form.title': 'Add your own comment :)',
    'post.comments.form.website': 'Website',
    'post.footer.comment': 'Leave a comment',
    'post.footer.date_modified': 'Last modified on:',
    'post.footer.title': 'Did you enjoy this article?',
    'post.footer.subtitle': 'Share it with your friends!',
    'post.relatedPost.title': 'Related Posts',
    'socialLinks.facebook.alt': 'Follow me on Facebook',
    'socialLinks.facebook.share': 'Share',
    'socialLinks.instagram.alt': 'Follow me on Instagram',
    'socialLinks.pinterest.alt': 'Follow me on Pinterest',
    'socialLinks.twitter.alt': 'Follow me on Twitter',
    'socialLinks.twitter.share': 'Share',
    'tag.grid.title': 'Tag: '
  },
  fr: {
    'card.date.modified': 'Mise à jour le ',
    'category.grid.title': 'Catégorie : ',
    'index.posts.title': 'Mes derniers articles sur Carnets Vanille',
    'index.title': 'Bienvenue',
    'newsletter.card.label': 'Abonnez-vous !',
    'newsletter.card.subtitle': 'J’envoie régulièrement mes bons plans et découvertes !',
    'newsletter.card.title':
      'Vous souhaitez recevoir des informations sur Saint-Malo ou sur le Québec ?',
    'newsletter.footer.copy':
      'En vous abonnant à mes carnets d’actualités sur Saint-Malo, vous recevrez <strong>gratuitement</strong> un extrait de mon ebook sur Saint-Malo ! Vous pouvez vous désabonner à tout moment, en un clic.',
    'newsletter.form.email': 'Votre adresse mail',
    'newsletter.form.firstName': 'Votre nom',
    'newsletter.form.submit': "Je m'abonne !",
    'newsletter.form.loading': 'En cours...',
    'newsletter.form.error':
      'Au moins un champ est manquant ou incorrect. Si quelque chose ne va pas, veuillez me contacter directement à : ',
    'newsletter.form.success':
      'Merci :) Surveillez votre boîte de réception pour ne rien manquer !',
    'newsletter.header.subtitle':
      'C’est la Bretagne qui vous intéresse ?<br />Ou au contraire, vous voulez en savoir plus sur le Québec ?<br />Les 2 peut-être ? À vous de choisir !',
    'newsletter.header.title': 'Abonnez-vous à mes carnets d’actualités !',
    'offCanvas.socialLinks.title': 'Suivez-moi sur :',
    'post.comments.subtitle': 'N’hésitez pas à me laisser un commentaire !',
    'post.comments.title': 'Commentaires',
    'post.comments.form.comment': 'Ecrire un commentaire',
    'post.comments.form.email': 'Email',
    'post.comments.form.errors.fields': 'Oups, au moins un des champs obligatoires est incorrect !',
    'post.comments.form.firstName': 'Prénom',
    'post.comments.form.loading': 'En cours...',
    'post.comments.form.submit': 'Envoyer',
    'post.comments.form.subtitle': 'J’y répondrai au plus vite !',
    'post.comments.form.title': 'Ajoutez le vôtre :)',
    'post.comments.form.website': 'Site internet',
    'post.footer.comment': 'Ecrire un commentaire',
    'post.footer.date_modified': 'Article mis à jour le : ',
    'post.footer.title': 'Est-ce que cet article vous a plu ?',
    'post.footer.subtitle': 'Partagez-le avec vos amis !',
    'post.relatedPost.title': 'Articles similaires',
    'socialLinks.facebook.alt': 'Suivez-moi sur Facebook',
    'socialLinks.facebook.share': 'Partager',
    'socialLinks.instagram.alt': 'Suivez-moi sur Instagram',
    'socialLinks.pinterest.alt': 'Suivez-moi sur Pinterest',
    'socialLinks.twitter.alt': 'Suivez-moi sur Twitter',
    'socialLinks.twitter.share': 'Partager',
    'tag.grid.title': 'Tag : '
  }
} as const
