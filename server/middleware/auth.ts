export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
  if (event.path.startsWith('/api') && token !== useRuntimeConfig(event).siteToken) {
    return createError({
      status: 401,
      statusText: 'Unauthorized',
    })
  }
})
