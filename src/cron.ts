import type { SSRManifest } from 'astro'
import { App } from 'astro/app'
import { handle } from '@astrojs/cloudflare/handler'

interface CustomEnv {
  DEPLOY_HOOK_URL: string
  ASSETS: any
  [key: string]: any // Allow for other environment variables
}

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest)

  return {
    default: {
      async fetch(request: any, env: CustomEnv, ctx: any) {
        // Pass-through to Astro's server-side rendering
        return handle(manifest, app, request, env, ctx)
      },

      async scheduled(event: any, env: CustomEnv, ctx: any) {
        if (env.DEPLOY_HOOK_URL) {
          console.log('Cron job started: triggering site rebuild.')
          try {
            const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' })
            if (response.ok) {
              console.log('Successfully triggered deploy hook.')
            } else {
              console.error(
                `Failed to trigger deploy hook: ${response.status} ${response.statusText}`
              )
            }
          } catch (error) {
            console.error('Error triggering deploy hook:', error)
          }
        } else {
          console.warn('DEPLOY_HOOK_URL environment variable not set. Skipping cron job.')
        }
      }
    }
  }
}
