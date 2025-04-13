// SSR API used client side at runtime.

import type { APIRoute } from 'astro'
import MailerLite from '@mailerlite/mailerlite-nodejs'

export const POST: APIRoute = async (context) => {
  const mailerLiteApiKey = (context.locals as any).runtime?.env?.MAILERLITE_KEY

  // Add logging for debugging
  console.log('Mailerlite API Key exists:', !!mailerLiteApiKey)
  console.log(
    'Environment:',
    (context.locals as any).runtime?.env?.MAILERLITE_KEY ? 'local' : 'cloudflare'
  )

  if (!mailerLiteApiKey) {
    return new Response(JSON.stringify({ error: 'Mailerlite API key is not configured' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const mailerlite = new MailerLite({
    api_key: mailerLiteApiKey
  })

  if (context.request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const body = await context.request.json()
    console.log('Request body:', body)

    const response = await mailerlite.subscribers.createOrUpdate(body)
    console.log('Mailerlite response:', response)

    if (response.data?.data) {
      return new Response(
        JSON.stringify({
          message: `Subscriber ${response.data.data.email} created/updated`,
          data: response.data.data
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    return new Response(JSON.stringify({ error: 'No data received from Mailerlite' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error: any) {
    console.error('Mailerlite API error:', error)
    return new Response(
      JSON.stringify({
        error: error.response?.data || 'An error occurred while processing your request',
        details: error.message
      }),
      {
        status: error.response?.status || 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
