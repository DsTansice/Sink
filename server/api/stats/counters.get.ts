import SqlBricks from 'sql-bricks'
import { QuerySchema } from '@/schemas/query'

const { select } = SqlBricks

function query2sql(query: Query): string {
  const filter = query2filter(query)
  const { dataset } = useRuntimeConfig()
  // visitors did not consider sampling
  return select(`SUM(_sample_interval) as views, COUNT(DISTINCT ${logsMap['ip']}) as visitors`).from(dataset).where(filter).toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, QuerySchema.parse)
  const sql = query2sql(query)
  return useWAE(event, sql)
})
