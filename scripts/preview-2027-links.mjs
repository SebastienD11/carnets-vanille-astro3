// For the 2027 review copy only: keeps visitors on the subdomain when they follow a link inside an
// article. Canonicals and hreflang are <link> tags, so they keep pointing at the real site.
// Run by `npm run deploy:2027`. Remove with the review copy.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const LIVE = /(<a\b[^>]*?\bhref=")https:\/\/carnetsvanille\.com/g
let files = 0
let links = 0

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8')
      const output = html.replace(LIVE, (_, start) => {
        links++
        return `${start}https://2027.carnetsvanille.com`
      })
      if (output !== html) {
        writeFileSync(path, output)
        files++
      }
    }
  }
}

walk('dist/client')
console.log(`${links} links moved to the subdomain, in ${files} pages`)
