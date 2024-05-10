import { z } from 'zod'
import SqlBricks from 'sql-bricks'

const { select } = SqlBricks

const QuerySchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  startAt: z.number().int().safe().optional(),
  endAt: z.number().int().safe().optional(),
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

function query2filter(query: { [x: string]: string | number | undefined }): Record<string, string | number | undefined> {
  const filter: { [x: string]: string | number | undefined } = {}
  Object.keys(logsMap).forEach((key) => {
    if (query[key]) {
      filter[logsMap[key]] = query[key]
    }
  })
  return filter
}

function query2sql(query: { [x: string]: string | number | undefined }): string {
  const filter = query2filter(query)
  const where = {
    index1: query.id,
    ...filter,
  }
  const { dataset } = useRuntimeConfig()
  if (query.type) {
    return select(`${logsMap[query.type]} as x, SUM(_sample_interval) as y`).from(dataset).where(where).groupBy(logsMap[query.type]).orderBy('y DESC').toString()
  }
  return select('*').from(dataset).where(where).orderBy('timestamp DESC').toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, QuerySchema.parse)
  return useWAE(event, query2sql(query))
})
