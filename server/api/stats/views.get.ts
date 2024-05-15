import { z } from 'zod'
import SqlBricks from 'sql-bricks'
import { QuerySchema } from '@/schemas/query'

const { select } = SqlBricks

const unitMap: { [x: string]: string } = {
  minute: '%Y-%m-%d %H:%M',
  hour: '%Y-%m-%d %H',
  day: '%Y-%m-%d',
}

const ViewsQuerySchema = QuerySchema.extend({
  unit: z.string(),
  clientTimezone: z.string().default('Etc/UTC'),
})

function query2sql(query: z.infer<typeof ViewsQuerySchema>): string {
  const filter = query2filter(query)
  const { dataset } = useRuntimeConfig()
  return select(`formatDateTime(timestamp, '${unitMap[query.unit]}', '${query.clientTimezone}') as time, SUM(_sample_interval) as visits, COUNT(DISTINCT ${logsMap['ip']}) as visitors`).from(dataset).where(filter).groupBy('time').orderBy('time').toString()
}

export default eventHandler(async (event) => {
  const query = await getValidatedQuery(event, ViewsQuerySchema.parse)
  const sql = query2sql(query)
  return useWAE(event, sql)
})
