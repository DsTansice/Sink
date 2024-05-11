import { z } from 'zod'

export const QuerySchema = z.object({
  id: z.string().optional(),
  startAt: z.coerce.number().int().safe().optional(),
  endAt: z.coerce.number().int().safe().optional(),
  source: z.string().optional(),
  countryCode: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  os: z.string().optional(),
  browser: z.string().optional(),
  browserType: z.string().optional(),
  device: z.string().optional(),
  deviceType: z.string().optional(),
})

export const FilterSchema = QuerySchema.omit({ id: true, startAt: true, endAt: true }).extend({
  index1: z.string().optional(),
})
