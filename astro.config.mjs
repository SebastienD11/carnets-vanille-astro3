import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import redirects from './redirectsList.json' with { type: 'json' }

// Every content page is prerendered. Only routes with `prerender = false`
// (/api/* and /preview/*) run on the Worker.
export default defineConfig({
  output: 'static',
  site: 'https://carnetsvanille.com',
  trailingSlash: 'ignore',
  // Sessions are unused. Without this the adapter wants a KV namespace on deploy.
  session: false,
  adapter: cloudflare({
    // Prerendering talks to WordPress and runs sharp, so it stays on Node.
    prerenderEnvironment: 'node',
    imageService: 'compile'
  }),
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    domains: ['content.carnetsvanille.com']
  },
  vite: {
    plugins: [basicSsl(), tailwindcss()]
  },
  redirects
})
