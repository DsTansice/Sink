import { z } from 'zod'
import { nanoid } from '../nanoid'

export const LinkSchema = z.object({
  id: z.string().trim().max(26).default(nanoid(10)),
  slug: z.string().trim().max(2048).default(nanoid(+(process.env.SINK_SLUG_DEFAULT_LENGTH || 6))),
  url: z.string().trim().url().max(2048),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  title: z.string().trim().max(2048).optional(),
  description: z.string().trim().max(2048).optional(),
  image: z.string().trim().url().max(2048).optional(),
})
