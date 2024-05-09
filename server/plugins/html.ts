export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', async (...args) => {
    console.log('beforeResponse', ...args)
  })
})
