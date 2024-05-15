import type { H3Event } from 'h3'
import SqlBricks from 'sql-bricks'
import { QuerySchema } from '@/schemas/query'

const { select } = SqlBricks

function query2sql(query: Query, event: H3Event): string {
  const filter = query2filter(query)
  const { dataset } = useRuntimeConfig(event)
  // visitors did not consider sampling
  return select(`SUM(_sample_interval) as visits, COUNT(DISTINCT ${logsMap['ip']}) as visitors, COUNT(DISTINCT ${logsMap['source']}) as referers`).from(dataset).where(filter).toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, QuerySchema.parse)
  const sql = query2sql(query, event)
  return useWAE(event, sql)
})
