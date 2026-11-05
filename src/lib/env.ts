// Runtime variables and secrets for routes that run on the Worker (/api/*).
// Astro's adapter removed `Astro.locals.runtime`, this is its replacement.
import { env as workerEnv } from 'cloudflare:workers'

export const env = workerEnv as unknown as Record<string, string | undefined>
