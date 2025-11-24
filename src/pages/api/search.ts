// SSR API used client side at runtime for search functionality.

import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  const wpApiUrl =
    (context.locals as any).runtime?.env?.WORDPRESS_REST_API_URL ||
    import.meta.env.WORDPRESS_REST_API_URL

  const searchParams = context.url.searchParams
  const query = searchParams.get('q')
  const lang = searchParams.get('lang') || 'fr'

  if (!query || query.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Search query is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    // WordPress REST API search endpoint
    // Using _embed to get featured media data
    const searchUrl = `${wpApiUrl}/posts?search=${encodeURIComponent(query)}&lang=${lang}&per_page=10&_embed`

    const response = await fetch(searchUrl)
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    const posts = await response.json()

    // Process posts to include featured media data
    const processedPosts = posts.map((post: any) => {
      let featuredMediaData = null

      // Get featured media from _embedded if available
      if (
        post._embedded &&
        post._embedded['wp:featuredmedia'] &&
        post._embedded['wp:featuredmedia'].length > 0
      ) {
        const media = post._embedded['wp:featuredmedia'][0]
        featuredMediaData = {
          url: media.source_url,
          alt_text: media.alt_text || post.title.rendered,
          width: media.media_details?.width || 800,
          height: media.media_details?.height || 600
        }
      }

      return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        featured_media_data: featuredMediaData
      }
    })

    return new Response(JSON.stringify({ results: processedPosts }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to perform search', details: String(error) }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

