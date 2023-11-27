import ansis from 'ansis'
import type { AstroIntegration } from 'astro'

export const lifecycleLogs = () => {
  const hooks = [
    `astro:config:setup`,
    `astro:config:done`,
    `astro:server:setup`,
    `astro:server:start`,
    `astro:server:done`,
    `astro:build:start`,
    `astro:build:setup`,
    `astro:build:generated`,
    `astro:build:ssr`,
    `astro:build:done`
  ] as const

  // base integration structure. "hooks" will be updated
  let integration: AstroIntegration = {
    name: 'astro-lifecycle-logs',
    hooks: {}
  }

  // loop over the hooks list and add the name and log
  for (const hook of hooks) {
    integration.hooks[hook] = ({ logger }) => {
      logger.info(`${ansis.yellow('[lifecycle-log]')} ${ansis.green(hook)}`)
    }
  }

  return integration
}

export default lifecycleLogs
