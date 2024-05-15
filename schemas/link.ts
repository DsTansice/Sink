import { z } from 'zod'
import { customAlphabet } from 'nanoid'

const { slugRegex } = useAppConfig()

export const nanoid = (length: number) => customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)

const slugDefaultLength = +useRuntimeConfig().public.slugDefaultLength

export const LinkSchema = z.object({
  id: z.string().trim().max(26).default(nanoid(10)),
  slug: z.string().trim().max(2048).regex(new RegExp(slugRegex)).default(nanoid(slugDefaultLength)),
  url: z.string().trim().url().max(2048),
  comment: z.string().trim().max(2048).optional(),
  createdAt: z.number().int().safe().default(() => Math.floor(Date.now() / 1000)),
  updatedAt: z.number().int().safe().default(() => Math.floor(Date.now() / 1000)),
  expiration: z.number().int().safe().optional(),
  title: z.string().trim().max(2048).optional(),
  description: z.string().trim().max(2048).optional(),
  image: z.string().trim().url().max(2048).optional(),
})
