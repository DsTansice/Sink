export default eventHandler((event) => {
  // curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql" -H "Authorization: Bearer <token>" -d "SHOW TABLES"
  const { cfAccountId, cfApiToken } = useRuntimeConfig(event)
  return $fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfApiToken}`,
    },
    body: 'SELECT * FROM sink ORDER BY timestamp DESC LIMIT 100',
  })
})
