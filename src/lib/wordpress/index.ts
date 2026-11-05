import { POSTS_PER_PAGE } from '../../constant'
import { getSnapshot, type Snapshot } from './snapshot'
import type { Category, Comment, Node, Page, Post, Tag } from './types'

export * from './types'
export { getSnapshot }

const pageCount = (total: number) => Math.ceil(total / POSTS_PER_PAGE)

const pagedPaths = (base: string, total: number) => {
  const paths = [base]
  for (let page = 2; page <= pageCount(total); page++) paths.push(`${base}/page/${page}`)
  return paths
}

const postsInTerm = (snapshot: Snapshot, field: 'categories' | 'tags', id: number) =>
  snapshot.posts.filter((post) => post[field]?.includes(id))

// Every path `[...uri].astro` has to generate for a language.
export async function getContentPaths(lang: string) {
  const snapshot = await getSnapshot(lang)
  const uris = [
    ...snapshot.pages.map((page) => page.slug),
    ...snapshot.posts.map((post) => post.slug),
    ...snapshot.tags.flatMap((tag) =>
      pagedPaths(`tag/${tag.slug}`, postsInTerm(snapshot, 'tags', tag.id).length)
    ),
    ...snapshot.categories.flatMap((category) =>
      pagedPaths(category.slug, postsInTerm(snapshot, 'categories', category.id).length)
    )
  ]
  return [...new Set(uris)].map((uri) => ({ params: { uri } }))
}

export async function getHomePaths(lang: string) {
  const snapshot = await getSnapshot(lang)
  const paths = []
  for (let page = 2; page <= pageCount(snapshot.posts.length); page++) {
    paths.push({ params: { page: String(page) } })
  }
  return paths
}

// Same precedence as before: tag (only under /tag/), then page, category, post.
export async function getResourceByUri(uri: string, lang: string): Promise<Node | null> {
  const snapshot = await getSnapshot(lang)
  const path = uri.split('/page/')[0].replace(/^\/|\/$/g, '')
  const slug = path.split('/').pop() ?? ''

  if (path.startsWith('tag/')) {
    const tag = snapshot.tagsBySlug.get(slug)
    if (tag) return tag
  }
  return (
    snapshot.pagesBySlug.get(slug) ??
    snapshot.categoriesBySlug.get(slug) ??
    snapshot.postsBySlug.get(slug) ??
    null
  )
}

export type PostList = { posts: Post[]; total: number; perPage: number; currentPage: number }

function paginate(posts: Post[], currentPage: number): PostList {
  const start = (currentPage - 1) * POSTS_PER_PAGE
  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    total: posts.length,
    perPage: POSTS_PER_PAGE,
    currentPage
  }
}

export async function getLatestPosts(lang: string, currentPage = 1) {
  const snapshot = await getSnapshot(lang)
  return paginate(snapshot.posts, currentPage)
}

export async function getPostsByCategory(lang: string, categoryId: number, currentPage = 1) {
  return paginate(postsInTerm(await getSnapshot(lang), 'categories', categoryId), currentPage)
}

export async function getPostsByTag(lang: string, tagId: number, currentPage = 1) {
  return paginate(postsInTerm(await getSnapshot(lang), 'tags', tagId), currentPage)
}

export async function getPostById(id: number, lang: string): Promise<Post | null> {
  return (await getSnapshot(lang)).postsById.get(id) ?? null
}

export async function getPostBySlug(slug: string, lang: string): Promise<Post | null> {
  return (await getSnapshot(lang)).postsBySlug.get(slug) ?? null
}

export async function getPostsBySlugs(slugs: string[], lang: string): Promise<Post[]> {
  const snapshot = await getSnapshot(lang)
  return slugs.flatMap((slug) => snapshot.postsBySlug.get(slug) ?? [])
}

export async function getCommentsFor(id: number, lang: string): Promise<Comment[]> {
  return (await getSnapshot(lang)).commentsByPost.get(id) ?? []
}

export async function getTermsOf(post: Post, lang: string): Promise<{ categories: Category[]; tags: Tag[] }> {
  const snapshot = await getSnapshot(lang)
  return {
    categories: (post.categories ?? []).flatMap((id) => snapshot.categoriesById.get(id) ?? []),
    tags: (post.tags ?? []).flatMap((id) => snapshot.tagsById.get(id) ?? [])
  }
}

// Pages of the current language, used to only link to pages that exist (notably in English).
export async function pageExists(slug: string, lang: string): Promise<boolean> {
  const snapshot = await getSnapshot(lang)
  return snapshot.pagesBySlug.has(slug) || snapshot.postsBySlug.has(slug)
}

// "14,90 €", from the ebook page's ACF price. Null if the page or price is missing.
export async function getEbookPrice(): Promise<string | null> {
  const page = (await getSnapshot('fr')).pagesBySlug.get('ebook-saint-malo')
  const price = Number(page?.acf?.product_display_informations?.content_product_price)
  if (!price) return null
  return `${price.toFixed(2).replace('.', ',')} €`
}

// Related posts picked in WordPress, topped up from the same category when there are fewer than 3.
export async function getRelatedPosts(post: Post, lang: string): Promise<Post[]> {
  const snapshot = await getSnapshot(lang)
  const picked = Array.isArray(post.acf?.related_posts) ? post.acf.related_posts : []
  const related = picked.flatMap((id) => snapshot.postsById.get(Number(id)) ?? [])
  const category = post.categories?.[0]
  for (const candidate of snapshot.posts) {
    if (related.length >= 3) break
    if (candidate.id !== post.id && !related.includes(candidate) && candidate.categories?.includes(category)) {
      related.push(candidate)
    }
  }
  return related.slice(0, 3)
}

export type { Page }
