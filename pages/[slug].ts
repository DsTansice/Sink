import { z } from 'zod'
import { LinkSchema } from '../server/lib/schema/link'

export default async () => {
  const route = useRoute()
  const slug = route.params.slug

  const link: z.infer<typeof LinkSchema> | null = await hubKV().get(`link:${slug}`)
  if (link) {
    navigateTo(link.url, { external: true, redirectCode: 307 })
  } else {
    navigateTo(`/?slug=${slug}`)
  }
}
