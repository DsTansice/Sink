import { useValidatedBody } from 'h3-zod';

import { LinkSchema } from '@/server/lib/schema/link'

export default eventHandler(async(event) => {
  const link = await useValidatedBody(event, LinkSchema)
  const existingLink = await hubKV().get(`link:${link.slug}`)
  if (existingLink) {
    setResponseStatus(event, 409)
    return {
      success: false,
      message: 'Link already exists'
    }
  } else {
    await hubKV().set(`link:${link.slug}`, link)
    return { success: true, link }
  }
})
