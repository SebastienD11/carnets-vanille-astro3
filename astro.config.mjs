import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import lifecycleLogs from './src/integrations/lifecycle-logs'
import vercel from '@astrojs/vercel'
import redirectList from '/redirectsList.json'
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [lifecycleLogs()],
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
  redirects: redirectList
})
