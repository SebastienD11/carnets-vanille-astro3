import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import lifecycleLogs from './src/integrations/lifecycle-logs'

import tailwind from '@astrojs/tailwind'
import vercelStatic from '@astrojs/vercel/static'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercelStatic(),
  integrations: [tailwind(), lifecycleLogs()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    domains: ['carnetsvanille.com']
  },
  vite: {
    plugins: [basicSsl()]
  }
})
