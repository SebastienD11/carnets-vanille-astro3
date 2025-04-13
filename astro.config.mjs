import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import lifecycleLogs from './src/integrations/lifecycle-logs'
import tailwind from '@astrojs/tailwind'
import redirectList from '/redirectsList.json'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    routes: {
      strategy: 'include',
      include: ['/api/*', '/api/mailerlite']
    }
  }),
  integrations: [tailwind(), lifecycleLogs()],
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
    plugins: [basicSsl()]
  },
  redirects: redirectList
})
