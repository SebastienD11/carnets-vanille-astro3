// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import Stripe from 'stripe'

export const POST: APIRoute = async (context) => {
  if (context.request.headers.get('Content-Type') === 'application/json') {
    const stripeSecretKey =
      (context.locals as any).runtime?.env?.ASTRO_APP_STRIPE_SECRET_KEY ||
      import.meta.env.ASTRO_APP_STRIPE_SECRET_KEY
    const stripe = new Stripe(stripeSecretKey)
    const body = await context.request.json()

    if (!body.customPrice && body.stripePriceId === '') return new Response(null, { status: 400 })
    if (!body.mlGroup) return new Response(null, { status: 400 })
    if (body.customPrice && body.stripeProductId === '') return new Response(null, { status: 400 })

    let lineItems

    if (body.customPrice) {
      lineItems = [
        {
          price_data: {
            currency: 'EUR',
            product: body.stripeProductId,
            unit_amount: body.customPrice.toFixed(2) * 100 // convert to cents
          },
          quantity: 1
        }
      ]
    } else {
      lineItems = [
        {
          price: body.stripePriceId,
          quantity: 1
        }
      ]
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      allow_promotion_codes: true,
      mode: 'payment',
      success_url: `${body.page.origin + body.page.pathname}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.page.origin + body.page.pathname,
      metadata: {
        ml_source: body.page.origin + body.page.pathname,
        ml_group: body.mlGroup
      }
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
