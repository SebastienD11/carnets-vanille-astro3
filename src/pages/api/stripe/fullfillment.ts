import MailerLite from '@mailerlite/mailerlite-nodejs'
import type { APIRoute } from 'astro'
import Stripe from 'stripe'

export const POST: APIRoute = async ({ params, request }) => {
  const stripe = new Stripe(import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY)
  const endpointSecret = import.meta.env.ASTRO_APP_STRIPE_WEBHOOK
  const sig = request.headers.get('stripe-signature')
  const payload = await request.text()
  const buffer = Buffer.from(payload)

  let event
  try {
    event = stripe.webhooks.constructEvent(buffer, sig, endpointSecret)
  } catch (err) {
    return new Response(JSON.stringify(`Webhook Error: ${err.message}`), { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items']
    })

    if (
      session.customer_details?.email &&
      session.status === 'complete' &&
      session.payment_status === 'paid' &&
      session.metadata?.ml_group
    ) {
      const params = {
        email: session.customer_details.email,
        fields: {
          cv_source: session.metadata?.ml_source,
          name: session.customer_details?.name,
          stripe_session_id: session.id
        },
        groups: [session.metadata.ml_group]
      }

      const mailerlite = new MailerLite({
        api_key: import.meta.env.MAILERLITE_KEY
      })

      return await mailerlite.subscribers
        .createOrUpdate(params)
        .then(() => {
          return new Response(null, {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        })
        .catch((error) => {
          return new Response(JSON.stringify({ error, session }), {
            status: 400
          })
        })
    } else {
      return new Response(
        JSON.stringify({ error: `Customer Upsert Error, Lack of customer infos`, session }),
        {
          status: 400
        }
      )
    }
  }

  return new Response(JSON.stringify(`Other Event: ${event.type}`), { status: 400 })
}
