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
    'ebook.banner.buy.subtitle':
      '<strong>180+ pages</strong> in PDF format on Saint-Malo and the Emerald Coast. Compatible with your tablet.',
    'ebook.banner.buy.title': 'Prepare your trip with my ebook "Discovering Saint-Malo"!',
    'ebook.banner.sample.submit': 'Get my sample',
    'ebook.banner.sample.subtitle':
      'You will also receive my newsletter on Saint-Malo and Brittany',
    'ebook.banner.sample.success':
      'Great! Check your inbox, you should receive the sample shortly!',
    'ebook.banner.sample.title':
      'Download a free extract from my ebook on Saint-Malo and the surrounding area',
    'form.error.fields': 'Oups, at least one of the required field is incorrect!',
    'form.error.generic': 'Oups, sometthing went wrong. Please, contact me directly at: ',
    'form.input.email': 'Email',
    'form.input.firstName': 'First Name',
    'index.posts.title': "Carnets Vanille's latest posts",
    'index.title': 'Welcome',
    'newsletter.card.label': 'Subscribe now!',
    'newsletter.card.subtitle': 'I regularly send out my good tips and discoveries!',
    'newsletter.card.title': 'Would you like to receive information about Saint-Malo or Quebec?',
    'newsletter.footer.copy':
      'By subscribing to my Saint-Malo newsletters, you will receive a <strong>free</strong> extract from my ebook on Saint-Malo! You can unsubscribe at any time, with one click.',
    'newsletter.form.email': 'Your email address',
    'newsletter.form.error.fields': 'Oups, at least one of the required field is incorrect!',
    'newsletter.form.firstName': 'Your name',
    'newsletter.form.loading': 'Sending...',
    'newsletter.form.submit': 'Subscribe',
    'newsletter.form.success': 'Thank you :) Be sure to monitor your inbox to not miss anything!',
    'newsletter.header.subtitle':
      'Are you interested in Brittany?<br />Or do you want to find out more about Quebec?<br />Maybe both? The choice is yours!',
    'newsletter.header.title': 'Subscribe to my newsletters!',
    'offCanvas.socialLinks.title': 'Follow me on ',
    'post.comments.form.comment': 'Write a comment',
    'post.comments.form.email': 'Email',
    'post.comments.form.errors.callback':
      'Oups, sometthing went wrong. Please, contact me directly at:',
    'post.comments.form.errors.fields': 'Oups, at least one of the required field is incorrect!',
    'post.comments.form.firstName': 'First Name',
    'post.comments.form.loading': 'Sending...',
    'post.comments.form.newsletter.ebook':
      'and will receive a <strong>free sample</strong> of my e-book on Saint-Malo.',
    'post.comments.form.newsletter': 'I want to subscribe to the newsletter ',
    'post.comments.form.submit': 'Submit',
    'post.comments.form.subtitle': "I'll reply as soon as possible!",
    'post.comments.form.success':
      'Thank you for your comment! Your comment has been sent and will be displayed after validation.',
    'post.comments.form.title': 'Add your own comment :)',
    'post.comments.form.website': 'Website',
    'post.comments.subtitle': "Leave me a comment, i'll reply as soon as possible!",
    'post.comments.title': 'Comments',
    'post.footer.comment': 'Leave a comment',
    'post.footer.date_modified': 'Last modified on',
    'post.footer.subtitle': 'Share it with your friends!',
    'post.footer.title': 'Did you enjoy this article?',
    'post.relatedPost.title': 'Related Posts',
    'product.common.back': 'Back to the blog',
    'product.common.buy': 'Buy for',
    'product.common.download': 'Download for free',
    'product.common.reviews': 'reviews',
    'product.common.section.title.content': 'The Content',
    'product.common.section.title.faq': 'FAQ',
    'product.common.section.title.testimonials': 'Testimonials',
    'product.common.select_price': 'Choose a price',
    'product.common.updatedIn': 'updated in',
    'product.common.writtenBy': 'Written by',
    'product.ebook.digitalProduct': 'Digital Product',
    'product.ebook.thankyou.text':
      'Your support is not only a source of encouragement, but also contributes directly to the realisation of my writing project on Saint-Malo and Brittany. <strong>Keep an eye on your inbox, the ebook should be arriving soon!</strong> If you have any concerns, please don\'t hesitate to contact me on <a href="mailto:sarah@carnetsvanille.com">sarah@carnetsvanille.com</a>.',
    'product.ebook.thankyou.title': 'Thank you for your purchase',
    'product.playbook.digitalProduct': 'Digital Playbook',
    'product.playbook.thankyou.text':
      'Your support is not only a source of encouragement, but also contributes directly to the realisation of my writing project on Saint-Malo and Brittany. <strong>Keep an eye on your inbox, the playbook should be arriving soon!</strong> If you have any concerns, please don\'t hesitate to contact me on <a href="mailto:sarah@carnetsvanille.com">sarah@carnetsvanille.com</a>.',
    'product.playbook.thankyou.title': 'Thank you for your purchase',
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
    'ebook.banner.buy.subtitle':
      "<strong>180+ pages</strong> au format PDF sur Saint-Malo et la Côte d'Émeraude. Compatible avec votre tablette.",
    'ebook.banner.buy.title': 'Préparez votre voyage avec mon ebook “Découvrir Saint-Malo” !',
    'ebook.banner.sample.submit': 'Recevoir mon extrait',
    'ebook.banner.sample.subtitle':
      'Vous recevrez également ma newsletter sur Saint-Malo et la Bretagne.',
    'ebook.banner.sample.success':
      'Super ! Vérifiez votre boite mail, vous devriez recevoir le ebook sous peu !',
    'ebook.banner.sample.title':
      'Téléchargez gratuitement un extrait de mon ebook sur Saint-Malo et ses environs',
    'form.error.fields': 'Oups, au moins un des champs obligatoires est incorrect !',
    'form.error.generic':
      "Oups, il y a eu un problème. Veuillez me contacter directement à l'adresse suivante : ",
    'form.input.email': 'Email',
    'form.input.firstName': 'Prénom',
    'index.posts.title': 'Mes derniers articles sur Carnets Vanille',
    'index.title': 'Bienvenue',
    'newsletter.card.label': 'Abonnez-vous !',
    'newsletter.card.subtitle': 'J’envoie régulièrement mes bons plans et découvertes !',
    'newsletter.card.title':
      'Vous souhaitez recevoir des informations sur Saint-Malo ou sur le Québec ?',
    'newsletter.footer.copy':
      'En vous abonnant à mes carnets d’actualités sur Saint-Malo, vous recevrez <strong>gratuitement</strong> un extrait de mon ebook sur Saint-Malo ! Vous pouvez vous désabonner à tout moment, en un clic.',
    'newsletter.form.email': 'Votre adresse mail',
    'newsletter.form.error.fields': 'Oups, au moins un des champs obligatoires est incorrect !',
    'newsletter.form.firstName': 'Votre nom',
    'newsletter.form.loading': 'En cours...',
    'newsletter.form.submit': "Je m'abonne !",
    'newsletter.form.success':
      'Merci :) Surveillez votre boîte de réception pour ne rien manquer !',
    'newsletter.header.subtitle':
      'C’est la Bretagne qui vous intéresse ?<br />Ou au contraire, vous voulez en savoir plus sur le Québec ?<br />Les 2 peut-être ? À vous de choisir !',
    'newsletter.header.title': 'Abonnez-vous à mes carnets d’actualités !',
    'offCanvas.socialLinks.title': 'Suivez-moi sur :',
    'post.comments.form.comment': 'Ecrire un commentaire',
    'post.comments.form.email': 'Email',
    'post.comments.form.errors.callback':
      "Oups, il y a eu un problème. Veuillez me contacter directement à l'adresse suivante : ",
    'post.comments.form.errors.fields': 'Oups, au moins un des champs obligatoires est incorrect !',
    'post.comments.form.firstName': 'Prénom',
    'post.comments.form.loading': 'En cours...',
    'post.comments.form.newsletter.ebook':
      'et vais recevoir un <strong>ebook gratuit</strong> sur Saint-Malo et ses environs.',
    'post.comments.form.newsletter': 'Je m’inscris aux carnets d’actualités pour découvrir ',
    'post.comments.form.submit': 'Envoyer',
    'post.comments.form.subtitle': 'J’y répondrai au plus vite !',
    'post.comments.form.success':
      'Merci ! Votre commentaire a bien été envoyé et sera affiché après validation.',
    'post.comments.form.title': 'Laissez un commentaire :)',
    'post.comments.form.website': 'Site internet',
    'post.comments.subtitle': 'N’hésitez pas à me laisser un commentaire !',
    'post.comments.title': 'Commentaires',
    'post.footer.comment': 'Ecrire un commentaire',
    'post.footer.date_modified': 'Article mis à jour le ',
    'post.footer.subtitle': 'Partagez-le avec vos amis !',
    'post.footer.title': 'Est-ce que cet article vous a plu ?',
    'post.relatedPost.title': 'Articles similaires',
    'product.common.back': 'Retour au blog',
    'product.common.buy': 'Acheter pour',
    'product.common.download': 'Télécharger gratuitement',
    'product.common.reviews': 'notes',
    'product.common.section.title.content': 'Le Contenu',
    'product.common.section.title.faq': 'FAQ',
    'product.common.section.title.testimonials': 'Témoignages',
    'product.common.select_price': 'Choisir un prix',
    'product.common.updatedIn': 'mis à jour en',
    'product.common.writtenBy': 'Écrit par',
    'product.ebook.digitalProduct': 'Livre numérique',
    'product.ebook.thankyou.text':
      "Votre soutien est non seulement une source d'encouragement, mais il contribue également directement à la réalisation de mon projet d'écriture sur Saint-Malo et la Bretagne. <strong>Surveillez votre boite email, l’ebook devrait arriver sous peu !</strong> En cas de soucis, n'hésitez pas à me contacter sur <a href=\"mailto:sarah@carnetsvanille.com\">sarah@carnetsvanille.com</a>.",
    'product.ebook.thankyou.title': 'Merci pour votre achat',
    'product.playbook.digitalProduct': 'Carnet de jeux à télécharger',
    'product.playbook.thankyou.text':
      "Votre soutien est non seulement une source d'encouragement, mais il contribue également directement à la réalisation de mon projet d'écriture sur Saint-Malo et la Bretagne. <strong>Surveillez votre boite email, le carnet devrait arriver sous peu !</strong> En cas de soucis, n'hésitez pas à me contacter sur <a href=\"mailto:sarah@carnetsvanille.com\">sarah@carnetsvanille.com</a>.",
    'product.playbook.thankyou.title': 'Merci pour votre achat',
    'socialLinks.facebook.alt': 'Suivez-moi sur Facebook',
    'socialLinks.facebook.share': 'Partager',
    'socialLinks.instagram.alt': 'Suivez-moi sur Instagram',
    'socialLinks.pinterest.alt': 'Suivez-moi sur Pinterest',
    'socialLinks.twitter.alt': 'Suivez-moi sur Twitter',
    'socialLinks.twitter.share': 'Partager',
    'tag.grid.title': 'Tag : '
  }
} as const
