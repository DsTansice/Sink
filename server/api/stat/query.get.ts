import { z } from 'zod'
import SqlBricks from 'sql-bricks'

const { select } = SqlBricks

const unitMap: { [x: string]: string } = {
  minute: '%Y-%m-%d %H:%M',
  hour: '%Y-%m-%d %H',
  day: '%Y-%m-%d',
}

const QuerySchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  unit: z.string().optional(),
  clientTimezone: z.string().default('Etc/UTC'),
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

const FilterSchema = QuerySchema.omit({ id: true, type: true, unit: true, clientTimezone: true, startAt: true, endAt: true })

type Query = z.infer<typeof QuerySchema>
type Filter = z.infer<typeof FilterSchema>

function query2filter(query: Query): Filter {
  const filter: Filter = {}
  Object.keys(logsMap).forEach((key) => {
    if (query[key]) {
      filter[logsMap[key]] = query[key]
    }
  })
  return filter
}

function query2sql(query: Query): string {
  const filter = query2filter(query)
  const where = {
    index1: query.id,
    ...filter,
  }
  const { dataset } = useRuntimeConfig()
  if (query.type) {
    return select(`${logsMap[query.type]} as x, SUM(_sample_interval) as y`).from(dataset).where(where).groupBy('x').orderBy('y DESC').toString()
  }
  if (query.unit) {
    // Etc/UTC
    return select(`formatDateTime(timestamp, '${unitMap[query.unit]}', '${query.clientTimezone}') as x, SUM(_sample_interval) as y`).from(dataset).where(where).groupBy('x').orderBy('x').toString()
  }
  return select('*').from(dataset).where(where).orderBy('timestamp DESC').toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, QuerySchema.parse)
  return useWAE(event, query2sql(query))
})
