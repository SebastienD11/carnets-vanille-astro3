// One snapshot of WordPress per language, fetched once and shared by every page.
//
// The old code made several requests per rendered page, which is what took the
// nightly build to 9+ minutes. Here a page render never touches the network: it
// reads from this snapshot, so a build costs about 40 requests in total.

import { requestStats, wpGetAll, yoastHead } from './client'
import type { Category, Comment, Page, Post, Tag, Yoast } from './types'

export type Snapshot = {
  lang: string
  /** Most recently modified first, which is the order every listing uses. */
  posts: Post[]
  pages: Page[]
  categories: Category[]
  tags: Tag[]
  home: Yoast
  commentsByPost: Map<number, Comment[]>
  postsById: Map<number, Post>
  postsBySlug: Map<string, Post>
  pagesBySlug: Map<string, Page>
  categoriesBySlug: Map<string, Category>
  categoriesById: Map<number, Category>
  tagsBySlug: Map<string, Tag>
  tagsById: Map<number, Tag>
}

// In `astro dev` the snapshot refreshes so WordPress edits show up. In a build it never does.
const DEV_TTL_MS = 5 * 60 * 1000

type CacheEntry = { at: number; value: Promise<Snapshot> }
const store = globalThis as unknown as { __cvSnapshots?: Map<string, CacheEntry> }
const cache = (store.__cvSnapshots ??= new Map())

// Replies are nested under their parent; a reply whose parent is hidden stays visible at top level.
function buildCommentTrees(comments: Comment[]) {
  const byId = new Map(comments.map((comment) => [comment.id, { ...comment, children: [] as Comment[] }]))
  const trees = new Map<number, Comment[]>()
  for (const comment of byId.values()) {
    const parent = comment.parent ? byId.get(comment.parent) : undefined
    if (parent) {
      parent.children!.push(comment)
    } else {
      if (!trees.has(comment.post)) trees.set(comment.post, [])
      trees.get(comment.post)!.push(comment)
    }
  }
  return trees
}

type RawData = [Post[], Page[], Category[], Tag[], Comment[], Yoast]

// Dev only: restarting `astro dev` should not cost a 50s wait. Delete .astro/wp-*.json to force a refresh.
const DISK_TTL_MS = 60 * 60 * 1000

async function readDiskCache(lang: string): Promise<RawData | null> {
  if (!import.meta.env.DEV) return null
  try {
    const { readFile, stat } = await import('node:fs/promises')
    const path = `.astro/wp-${lang}.json`
    if (Date.now() - (await stat(path)).mtimeMs > DISK_TTL_MS) return null
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return null
  }
}

async function writeDiskCache(lang: string, data: RawData) {
  if (!import.meta.env.DEV) return
  try {
    const { mkdir, writeFile } = await import('node:fs/promises')
    await mkdir('.astro', { recursive: true })
    await writeFile(`.astro/wp-${lang}.json`, JSON.stringify(data))
  } catch {
    // The cache is a convenience, never a reason to fail.
  }
}

async function fetchRaw(lang: string): Promise<RawData> {
  const isProduction = import.meta.env.CUSTOM_ENV === 'production'
  return Promise.all([
    // Full posts cost about 0.4s each on the server, and per_page=100 hits a 504. 20 is safe.
    wpGetAll<Post>(`/posts?lang=${lang}&orderby=modified&order=desc`, { perPage: 20 }),
    // Pages carry ACF fields that need the application password. Drafts only exist outside production.
    wpGetAll<Page>(`/pages?lang=${lang}&acf_format=standard${isProduction ? '' : '&status=publish,draft'}`, {
      auth: true
    }),
    wpGetAll<Category>(`/categories?lang=${lang}`),
    wpGetAll<Tag>(`/tags?lang=${lang}`),
    // Deliberately anonymous: WordPress then returns approved comments only.
    wpGetAll<Comment>(`/comments?lang=${lang}`),
    yoastHead<Yoast>(`${import.meta.env.BLOG_URL}/`, lang)
  ])
}

async function loadSnapshot(lang: string): Promise<Snapshot> {
  const startedAt = Date.now()
  const requestsBefore = requestStats.count
  const cached = await readDiskCache(lang)
  const raw = cached ?? (await fetchRaw(lang))
  if (!cached) await writeDiskCache(lang, raw)
  const [posts, pages, categories, tags, comments, home] = raw

  console.log(
    `[wordpress] ${lang}: ${posts.length} posts, ${pages.length} pages, ${categories.length} categories, ` +
      `${tags.length} tags, ${comments.length} comments, ` +
      `${requestStats.count - requestsBefore} requests, ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  )

  return {
    lang,
    posts,
    pages,
    categories,
    tags,
    home,
    commentsByPost: buildCommentTrees(comments),
    postsById: new Map(posts.map((post) => [post.id, post])),
    postsBySlug: new Map(posts.map((post) => [post.slug, post])),
    pagesBySlug: new Map(pages.map((page) => [page.slug, page])),
    categoriesBySlug: new Map(categories.map((category) => [category.slug, category])),
    categoriesById: new Map(categories.map((category) => [category.id, category])),
    tagsBySlug: new Map(tags.map((tag) => [tag.slug, tag])),
    tagsById: new Map(tags.map((tag) => [tag.id, tag]))
  }
}

export function getSnapshot(lang: string): Promise<Snapshot> {
  const entry = cache.get(lang)
  if (entry && (!import.meta.env.DEV || Date.now() - entry.at < DEV_TTL_MS)) return entry.value

  const value = loadSnapshot(lang)
  // A failed load must not stay cached, or dev would keep failing until restarted.
  value.catch(() => cache.delete(lang))
  cache.set(lang, { at: Date.now(), value })
  return value
}
