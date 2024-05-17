import type { z } from 'zod'
import type { SelectStatement } from 'sql-bricks'
import type { QuerySchema, FilterSchema } from '@/schemas/query'

export type Query = z.infer<typeof QuerySchema>
export type Filter = z.infer<typeof FilterSchema>

export function query2filter(query: Query): Filter {
  const filter: Filter = {}
  if (query.id) {
    filter.index1 = query.id
  }
  Object.keys(logsMap).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (query[key]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      filter[logsMap[key]] = query[key]
    }
  })
  return filter
}

export function appendTimeFilter(sql: SelectStatement, query: Query): unknown {
  if (query.startAt) {
    sql.where(SqlBricks.gte('timestamp', SqlBricks(`toDateTime(${query.startAt})`)))
  }
  if (query.endAt) {
    sql.where(SqlBricks.lte('timestamp', SqlBricks(`toDateTime(${query.endAt})`)))
  }
  return sql
}
