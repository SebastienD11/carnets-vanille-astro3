// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import Stripe from 'stripe'

export const POST: APIRoute = async ({ request, redirect }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const stripe = new Stripe(import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1NKStCKYHvAdiOgznb8mBdM9',
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `https://localhost:4321/ebook-saint-malo?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://localhost:4321/ebook-saint-malo`
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
