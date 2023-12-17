import type { APIRoute } from 'astro'
import MailerLite, { type GroupObject } from '@mailerlite/mailerlite-nodejs'

export const GET: APIRoute = async () => {
  const mailerLiteApiKey = import.meta.env.MAILERLITE_KEY
  const mailerlite = new MailerLite({
    api_key: mailerLiteApiKey
  })
  let groups = []

  const params = {
    limit: 25,
    page: 1
  }

  await mailerlite.groups
    .get(params)
    .then((response) => {
      groups = response.data
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data)
    })

  return new Response(JSON.stringify(groups))
}
