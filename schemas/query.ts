import { z } from 'zod'

export const QuerySchema = z.object({
  id: z.string().optional(),
  startAt: z.coerce.number().int().safe().optional(),
  endAt: z.coerce.number().int().safe().optional(),
  url: z.string().optional(),
  slug: z.string().optional(),
  source: z.string().optional(),
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
  UTMSource: z.string().optional(),
  UTMMedium: z.string().optional(),
  UTMCampaign: z.string().optional(),
  UTMTerm: z.string().optional(),
  UTMContent: z.string().optional(),
  limit: z.coerce.number().int().max(1000).default(1000),
})

export const FilterSchema = QuerySchema.omit({ id: true, startAt: true, endAt: true, limit: true }).extend({
  index1: z.string().optional(),
})
