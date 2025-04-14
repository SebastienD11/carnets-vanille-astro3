import MailerLite from '@mailerlite/mailerlite-nodejs'
import type { APIRoute } from 'astro'
import Stripe from 'stripe'

export const POST: APIRoute = async (context) => {
  const stripeSecretKey =
    (context.locals as any).runtime?.env?.ASTRO_APP_STRIPE_SECRET_KEY ||
    import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY
  const endpointSecret =
    (context.locals as any).runtime?.env?.ASTRO_APP_STRIPE_WEBHOOK ||
    import.meta.env.ASTRO_APP_STRIPE_WEBHOOK
  const mailerLiteKey =
    (context.locals as any).runtime?.env?.MAILERLITE_KEY || import.meta.env.MAILERLITE_KEY

  const stripe = new Stripe(stripeSecretKey)
  const sig = context.request.headers.get('stripe-signature')
  const payload = await context.request.text()
  const buffer = Buffer.from(payload)

  let event
  try {
    if (!sig) throw new Error('No stripe signature found')
    event = await stripe.webhooks.constructEventAsync(buffer, sig, endpointSecret)
  } catch (err: unknown) {
    const error = err as Error
    return new Response(JSON.stringify(`Webhook Error: ${error.message}`), { status: 400 })
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
        api_key: mailerLiteKey
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
