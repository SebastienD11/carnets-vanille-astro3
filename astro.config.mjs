import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'
import lifecycleLogs from './src/integrations/lifecycle-logs'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://carnetsvanille.com', // required for sitemap build
  adapter: vercel(),
  integrations: [
    tailwind(),
    lifecycleLogs(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr',
          en: 'en'
        }
      }
    })
  ],
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
  }
})
