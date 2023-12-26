// SSR API used client side at runtime.

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const wpCommentRoute = import.meta.env.WORDPRESS_REST_API_URL + '/comments'

  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json()
    const headerAuth = `Basic ${btoa(
      import.meta.env.WORDPRESS_APP_USERNAME + ':' + import.meta.env.WORDPRESS_APP_PASSWORD
    )}`

    const response = await fetch(wpCommentRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: headerAuth
      },
      body: JSON.stringify(body)
    })

    return response
  }
  return new Response(null, { status: 400 })
}
