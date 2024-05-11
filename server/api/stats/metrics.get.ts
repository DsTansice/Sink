import { z } from 'zod'
import SqlBricks from 'sql-bricks'
import { QuerySchema } from '@/schemas/query'

const { select } = SqlBricks

const MetricsQuerySchema = QuerySchema.extend({
  type: z.string(),
})

function query2sql(query: z.infer<typeof MetricsQuerySchema>): string {
  const filter = query2filter(query)
  const { dataset } = useRuntimeConfig()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return select(`${logsMap[query.type]} as name, SUM(_sample_interval) as count`).from(dataset).where(filter).groupBy('name').orderBy('count DESC').toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, MetricsQuerySchema.parse)
  const sql = query2sql(query)
  return useWAE(event, sql)
})
