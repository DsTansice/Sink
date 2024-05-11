import type { z } from 'zod'
import type { QuerySchema, FilterSchema } from '@/schemas/query'

type Query = z.infer<typeof QuerySchema>
type Filter = z.infer<typeof FilterSchema>

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
