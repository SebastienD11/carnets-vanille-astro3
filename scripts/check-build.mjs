// Checks a finished build without touching the network. Run with: npm run check:build
// Optional: node scripts/check-build.mjs path/to/urls.json   (a list of URLs that must exist)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist/client'
const problems = []
const report = (kind, detail) => problems.push(`${kind}: ${detail}`)

const htmlFiles = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (name.endsWith('.html')) htmlFiles.push(path)
  }
}
walk(DIST)

const urlOf = (file) => `/${relative(DIST, file).replace(/index\.html$/, '')}`
const pages = new Set(htmlFiles.map(urlOf))

const redirects = new Set(
  existsSync(join(DIST, '_redirects'))
    ? readFileSync(join(DIST, '_redirects'), 'utf8')
        .split('\n')
        .map((line) => line.trim().split(/\s+/)[0])
        .filter(Boolean)
        .map((from) => from.replace(/\/?$/, '/'))
    : []
)
const exists = (url) => pages.has(url) || redirects.has(url) || existsSync(join(DIST, url))

// 1. Every URL from the baseline still exists.
const baselinePath = process.argv[2]
if (baselinePath) {
  const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'))
  for (const url of baseline) if (!exists(url)) report('MISSING URL', url)
  console.log(`baseline: ${baseline.length} URLs checked`)
}

// 2. Per-page checks.
let redirectStubs = 0
for (const file of htmlFiles) {
  const url = urlOf(file)
  const html = readFileSync(file, 'utf8')
  if (/http-equiv="refresh"/.test(html)) {
    redirectStubs++
    continue
  }
  const lang = html.match(/<html lang="([^"]+)"/)?.[1]
  const expected = url.startsWith('/en/') ? 'en' : 'fr'
  if (lang !== expected) report('WRONG LANG', `${url} is lang=${lang}`)
  if (!/<title>[^<]+<\/title>/.test(html)) report('NO TITLE', url)
  if (url !== '/404.html' && !/<link rel="canonical"/.test(html)) report('NO CANONICAL', url)
  if (/shortcode_(free_)?ebook_banner/.test(html)) report('RAW SHORTCODE', url)
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1 && !/\/page\/\d+\/$/.test(url) && url !== '/linktree/' && url !== '/en/linktree/') {
    report('H1 COUNT', `${url} has ${(html.match(/<h1[\s>]/g) ?? []).length}`)
  }
  const page = url.match(/\/page\/(\d+)\/$/)?.[1]
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (page && canonical && !canonical.endsWith(`page/${page}/`)) report('BAD CANONICAL', `${url} -> ${canonical}`)

  // Internal links must lead somewhere.
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)) {
    if (href.startsWith('/api/') || href.startsWith('/preview/')) continue
    const target = href.endsWith('/') || /\.[a-z0-9]+$/i.test(href) ? href : `${href}/`
    if (!exists(target)) report('BROKEN LINK', `${url} -> ${href}`)
  }
  // English pages never link to French pages from the site's own chrome.
  if (expected === 'en') {
    const chrome = html.replace(/<div class="cv-prose[\s\S]*?<\/article>/g, '')
    for (const [, href] of chrome.matchAll(/<a\b[^>]*\shref="(\/(?!en\/|en"|api\/)[^"#?]*)/g)) {
      if (href !== '/' && !/hreflang="fr"/.test(html.match(new RegExp(`<a[^>]*href="${href}"[^>]*>`))?.[0] ?? '')) {
        report('EN LINKS TO FR', `${url} -> ${href}`)
      }
    }
  }
}

const byKind = {}
for (const problem of problems) (byKind[problem.split(':')[0]] ??= []).push(problem)
console.log(`${htmlFiles.length} pages (${redirectStubs} redirect stubs), ${problems.length} problems`)
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n${kind} (${list.length})`)
  for (const line of list.slice(0, 15)) console.log(`  ${line}`)
  if (list.length > 15) console.log(`  ... and ${list.length - 15} more`)
}
process.exit(problems.length ? 1 : 0)
