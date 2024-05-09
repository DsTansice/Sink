import type { z } from 'zod'
import { slugRegex } from '@/utils/slug'
import type { LinkSchema } from '@/server/schema/link'
// import { accessLog } from '@/server/utils/access-log'

export default eventHandler(async (event) => {
  const slug = event.path.slice(1) // remove leading slash
  if (slugRegex.test(slug)) {
    const { cloudflare } = event.context
    const { KV } = cloudflare.env
    const link: z.infer<typeof LinkSchema> | null = await KV.get(`link:${slug}`, { type: 'json' })
    if (link) {
      try {
        await useAccessLog(event)
      }
      catch (error) {
        console.error('Failed to log access', error)
      }
      return sendRedirect(event, link.url, +useRuntimeConfig(event).redirectStatusCode)
    }
  }
})
