import { defineConfig } from 'astro/config'
import basicSsl from '@vitejs/plugin-basic-ssl'

import tailwind from '@astrojs/tailwind'
import vercelStatic from '@astrojs/vercel/static'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercelStatic(),
  integrations: [tailwind()],
  image: {
    domains: ['carnetsvanille.com']
  },
  vite: {
    plugins: [basicSsl()]
  }
})
