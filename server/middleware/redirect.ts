import { z } from 'zod'
import { LinkSchema } from '@/server/lib/schema/link'
import { slugRegex } from '@/server/lib/slug'
export default eventHandler(async (event) => {
  const slug = event.path.slice(1) // remove leading slash
  if (slugRegex.test(slug)) {
    const link: z.infer<typeof LinkSchema> | null = await hubKV().get(`link:${slug}`)
    if (link) {
      return sendRedirect(event, link.url, +(process.env.SINK_REDIRECT_STATUS_CODE || 301))
    }
  }
})
