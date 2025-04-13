// SSR API used client side at runtime.

import type { APIRoute } from 'astro'

export const POST: APIRoute = async (context) => {
  const wpApiUrl =
    (context.locals as any).runtime?.env?.WORDPRESS_REST_API_URL ||
    import.meta.env.WORDPRESS_REST_API_URL
  const wpUsername =
    (context.locals as any).runtime?.env?.WORDPRESS_APP_USERNAME ||
    import.meta.env.WORDPRESS_APP_USERNAME
  const wpPassword =
    (context.locals as any).runtime?.env?.WORDPRESS_APP_PASSWORD ||
    import.meta.env.WORDPRESS_APP_PASSWORD

  const wpCommentRoute = wpApiUrl + '/comments'

  if (context.request.headers.get('Content-Type') === 'application/json') {
    const body = await context.request.json()
    const headerAuth = `Basic ${btoa(wpUsername + ':' + wpPassword)}`

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
