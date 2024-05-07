import { z } from "zod";
import { destr } from 'destr'

export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  const { KV } = cloudflare.env
  const { limit, cursor } = await getValidatedQuery(event, z.object({
    limit: z.coerce.number().max(100).default(20),
    cursor: z.string().trim().max(100).optional(),
  }).parse)
  const list = await KV.list({
    prefix: `link:`,
    limit,
    cursor
  })
  if (Array.isArray(list.keys)) {
    list.links = await Promise.all(list.keys.map(async (key: { name: string; }) => {
      return destr(await KV.get(key.name))
    }))
  }
  delete list.keys
  return list
})
