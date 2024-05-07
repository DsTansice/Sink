import { z } from 'zod'
import { useValidatedBody } from 'h3-zod';

import { LinkSchema } from '@/server/lib/schema/link'

export default eventHandler(async(event) => {
  const link = await useValidatedBody(event, LinkSchema)
  const existingLink: z.infer<typeof LinkSchema> | null = await hubKV().get(`link:${link.slug}`)
  if (existingLink) {
    const newLink = {
      ...existingLink,
      ...link,
      createdAt: existingLink.createdAt, // don't update createdAt
      updatedAt: new Date()
    }
    await hubKV().set(`link:${link.slug}`, newLink)
    setResponseStatus(event, 201)
    return { link: newLink }
  }
})
