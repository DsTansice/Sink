export function useWAE(query: string) {
  const { cfAccountId, cfApiToken } = useRuntimeConfig()
  console.log(query)
  return $fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfApiToken}`,
    },
    body: query,
    retry: 3,
    retryDelay: 100, // ms
  })
}
