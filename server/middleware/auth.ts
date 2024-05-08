export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
  if (token !== useRuntimeConfig(event).siteToken) {
    return createError({
      status: 401,
      statusText: 'Unauthorized',
    })
  }
})
