// Fails if any secret from .env appears in the public output. Prints variable names, never values.
// Run after a build: node scripts/check-secrets.mjs
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SECRET_KEYS = [
  'WORDPRESS_APP_PASSWORD',
  'MAILERLITE_KEY',
  'ASTRO_APP_STRIPE_SECRET_KEY',
  'ASTRO_APP_STRIPE_WEBHOOK'
]
if (!existsSync('.env')) {
  console.log('no .env, nothing to compare against')
  process.exit(0)
}
const values = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/))
    .filter(Boolean)
    .map(([, key, value]) => [key, value.trim().replace(/^["']|["']$/g, '')])
)
const secrets = SECRET_KEYS.filter((key) => (values[key] ?? '').length >= 6).map((key) => [key, values[key]])
console.log(`checking ${secrets.length} secrets: ${secrets.map(([key]) => key).join(', ')}`)

const scan = (root) => {
  const hits = []
  let files = 0
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) walk(path)
      else if (!/\.(webp|png|jpe?g|woff2?|ico)$/.test(name)) {
        files++
        const text = readFileSync(path, 'utf8')
        for (const [key, value] of secrets) if (text.includes(value)) hits.push(`${key} in ${path}`)
      }
    }
  }
  walk(root)
  return { files, hits }
}

const client = scan('dist/client')
console.log(`dist/client: ${client.files} files, ${client.hits.length} secrets found`)
client.hits.forEach((hit) => console.log(`  ${hit}`))
const server = scan('dist/server')
console.log(`dist/server (never public): ${server.files} files`)
server.hits.forEach((hit) => console.log(`  ${hit}`))
process.exit(client.hits.length ? 1 : 0)
