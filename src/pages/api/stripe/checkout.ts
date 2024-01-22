// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import Stripe from 'stripe'

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const stripe = new Stripe(import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY)
    const body = await request.json()
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: body.stripePriceId,
          quantity: 1
        }
      ],
      allow_promotion_codes: true,
      mode: 'payment',
      success_url: `${body.page.href}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.page.href
    })

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return new Response(null, { status: 400 })
}
