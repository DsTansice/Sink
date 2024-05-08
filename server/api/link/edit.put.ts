import type { z } from 'zod'
import { useValidatedBody } from 'h3-zod';
import { LinkSchema } from '@/server/schema/link'
import { getExpiration } from '@/server/utils/time';

export default eventHandler(async(event) => {
  const link = await useValidatedBody(event, LinkSchema)
  const { cloudflare } = event.context
  const { KV } = cloudflare.env

  const existingLink: z.infer<typeof LinkSchema> | null = await KV.get(`link:${link.slug}`, { type: "json" })
  if (existingLink) {
    const newLink = {
      ...existingLink,
      ...link,
      id: existingLink.id, // don't update id
      createdAt: existingLink.createdAt, // don't update createdAt
      updatedAt: Math.floor(Date.now() / 1000)
    }
    const expiration = getExpiration(event, newLink.expiration)
    await KV.put(`link:${newLink.slug}`, JSON.stringify(newLink), {
      expiration,
      metadata: {
        expiration,
      }
    })
    setResponseStatus(event, 201)
    return { link: newLink }
  }
})
