export default eventHandler(async (event) => {
  const { slug } = await readBody(event)
  if (slug) {
    await hubKV().del(`link:${slug}`)
  }
})
