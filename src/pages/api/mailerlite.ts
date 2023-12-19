// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const POST: APIRoute = async ({ request }) => {
  const mailerLiteApiKey = import.meta.env.MAILERLITE_KEY
  const mailerlite = new MailerLite({
    api_key: mailerLiteApiKey
  })

  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json()
    let error
    let res

    await mailerlite.subscribers
      .createOrUpdate(body)
      .then((response) => {
        res = response.data.data
      })
      .catch((error) => {
        if (error.response) error = error.response.data
      })

    if (error) {
      return new Response(error, { status: 400 })
    }
    if (res) {
      return new Response(JSON.stringify(`Subscriber ${res.email} created/updated`), {
        status: 200
      })
    }
    return new Response(null, { status: 400 })
  }
  return new Response(null, { status: 400 })
}
