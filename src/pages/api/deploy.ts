export async function GET({}) {
  if (!import.meta.env.VERCEL_WEBHOOK_DEPLOY_URL) {
    throw new Error('You must define MONDAY_DEPLOY_URL env variable for this cron.')
  }

  return await fetch(import.meta.env.VERCEL_WEBHOOK_DEPLOY_URL)
}
