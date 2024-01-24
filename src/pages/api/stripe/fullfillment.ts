import type { APIRoute } from 'astro'
import Stripe from 'stripe'

const fulfillOrder = (lineItems) => {
  // TODO: fill me in
  console.log('Fulfilling order', lineItems)
}

export const POST: APIRoute = async ({ params, request }) => {
  const stripe = new Stripe(import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY)
  // Find your endpoint's secret in your Dashboard's webhook settings
  const endpointSecret = 'whsec_ae1decd8a8b6345611d293577ae87f9e2b2c4e0f3ae475c0e9f0c7706c71536a'

  const sig = request.headers.get('stripe-signature')
  const payload = await request.text()
  const buffer = Buffer.from(payload)

  let event
  try {
    console.log(`ICI`)
    event = stripe.webhooks.constructEvent(buffer, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    return new Response(JSON.stringify(`Webhook Error: ${err.message}`), { status: 400 })
  }
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items']
    })
    const lineItems = sessionWithLineItems.line_items
    // Fulfill the purchase...
    fulfillOrder(lineItems)
  }

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
