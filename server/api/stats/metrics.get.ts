import type { H3Event } from 'h3'
import { z } from 'zod'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SqlBricks from 'sql-bricks-sqlite'
import { QuerySchema } from '@/schemas/query'

const { select } = SqlBricks

const MetricsQuerySchema = QuerySchema.extend({
  type: z.string(),
})

function query2sql(query: z.infer<typeof MetricsQuerySchema>, event: H3Event): string {
  const filter = query2filter(query)
  const { dataset } = useRuntimeConfig(event)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return select(`${logsMap[query.type]} as name, SUM(_sample_interval) as count`).from(dataset).where(filter).groupBy('name').orderBy('count DESC').limit(query.limit).toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, MetricsQuerySchema.parse)
  const sql = query2sql(query, event)
  return useWAE(event, sql)
})
