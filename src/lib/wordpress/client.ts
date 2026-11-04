// Low-level WordPress REST client. Read-only: this module only ever issues GET.
//
// A failed request throws instead of returning an empty list. A WordPress outage
// must fail the nightly build, so the last good deploy stays online, rather than
// publish a site with missing pages.

const TIMEOUT_MS = 60_000
const RETRIES = 3
const PER_PAGE = 100
const CONCURRENCY = 3

export const requestStats = { count: 0 }

const authHeader = () =>
  `Basic ${btoa(`${import.meta.env.WORDPRESS_APP_USERNAME}:${import.meta.env.WORDPRESS_APP_PASSWORD}`)}`

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(url: string, auth: boolean): Promise<Response> {
  let lastError: unknown
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      requestStats.count++
      const res = await fetch(url, {
        method: 'GET',
        headers: auth ? { Authorization: authHeader() } : undefined,
        signal: AbortSignal.timeout(TIMEOUT_MS)
      })
      if (res.ok) return res
      // 4xx will not get better with a retry.
      if (res.status < 500) throw new Error(`HTTP ${res.status}`)
      lastError = new Error(`HTTP ${res.status}`)
    } catch (error) {
      lastError = error
      if (error instanceof Error && error.message.startsWith('HTTP 4')) break
    }
    if (attempt < RETRIES) await sleep(attempt * 1000)
  }
  // The URL carries no credentials, so it is safe to print.
  throw new Error(`WordPress request failed: ${url} (${String(lastError)})`)
}

export async function wpGet<T>(path: string, { auth = false } = {}): Promise<T> {
  const res = await request(`${import.meta.env.WORDPRESS_REST_API_URL}${path}`, auth)
  return (await res.json()) as T
}

export async function yoastHead<T>(url: string, lang: string): Promise<T> {
  const res = await request(
    `${import.meta.env.WORDPRESS_REST_API_URL_SHORT}/yoast/v1/get_head?url=${url}&lang=${lang}`,
    false
  )
  const body = (await res.json()) as { json: T }
  return body.json
}

type Translated = { wpml_translations?: { locale: string; href: string }[] }

// In a full list response, WordPress returns translations cumulatively: each item carries its own
// plus those of every item before it in that response. Single-item requests are correct, and
// `_fields` is no way out because it returns the field empty. So an item's real translations are
// what it adds to the previous item. This stays correct if the plugin is ever fixed, since
// the items then simply have nothing in common.
export function repairTranslations<T>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.map((item) => {
    const current = (item as Translated).wpml_translations
    // Comments have no translations.
    if (!current) return item
    const own = current.filter((translation) => !seen.has(translation.href))
    current.forEach((translation) => seen.add(translation.href))
    return { ...item, wpml_translations: own }
  })
}

// Fetches every page of a collection, using X-WP-TotalPages to know when to stop.
// Each response is repaired on its own, because the accumulation restarts with each request.
export async function wpGetAll<T>(
  path: string,
  { auth = false, perPage = PER_PAGE } = {}
): Promise<T[]> {
  const base = `${import.meta.env.WORDPRESS_REST_API_URL}${path}${path.includes('?') ? '&' : '?'}per_page=${perPage}`
  const first = await request(`${base}&page=1`, auth)
  const totalPages = Number(first.headers.get('X-WP-TotalPages') ?? '1')
  const items = repairTranslations((await first.json()) as T[])

  const remaining = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => i + 2)
  const results: T[][] = []
  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY)
    results.push(
      ...(await Promise.all(
        batch.map(async (page) =>
          repairTranslations((await (await request(`${base}&page=${page}`, auth)).json()) as T[])
        )
      ))
    )
  }
  return items.concat(...results)
}
