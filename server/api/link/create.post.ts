import { useValidatedBody } from 'h3-zod';
import { LinkSchema } from '@/server/schema/link'

export default eventHandler(async(event) => {
  const link = await useValidatedBody(event, LinkSchema)
  const existingLink = await hubKV().has(`link:${link.slug}`)
  if (existingLink) {
    return createError({
      status: 409, // Conflict
      statusText: 'Link already exists',
    })
  } else {
    await hubKV().set(`link:${link.slug}`, link)
    setResponseStatus(event, 201)
    return { link }
  }
})
