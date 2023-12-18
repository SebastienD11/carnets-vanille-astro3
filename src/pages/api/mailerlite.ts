// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import MailerLite, { type GroupObject } from '@mailerlite/mailerlite-nodejs'

export const GET: APIRoute = async () => {
  const mailerLiteApiKey = import.meta.env.MAILERLITE_KEY
  const mailerlite = new MailerLite({
    api_key: mailerLiteApiKey
  })
  let groups: GroupObject[] = []

  await mailerlite.groups
    .get({ sort: 'name' })
    .then((response) => {
      groups = response.data.data
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data)
    })

  return new Response(JSON.stringify(groups))
}
