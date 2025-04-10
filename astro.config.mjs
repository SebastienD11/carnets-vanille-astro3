import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import lifecycleLogs from './src/integrations/lifecycle-logs'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import redirectList from '/redirectsList.json'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
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
