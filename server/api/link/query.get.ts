export default eventHandler(async (event) => {
  const slug = getQuery(event).slug
  if (slug) {
    const link = await hubKV().get(`link:${slug}`)
    if (link) {
      return {
        link
      }
    }
  }
  return createError({
    statusCode: 404,
    statusMessage: 'Not Found',
  })
})
