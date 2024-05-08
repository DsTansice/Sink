// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthub/core', "@nuxt/eslint"],
  hub: {
    database: false,
    kv: true,
    blob: false,
    cache: false,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  appConfig: {
    previewTTL: 24 * 3600, // 24h
  },
  runtimeConfig: {
    siteToken: '',
    previewMode: '',
    slugDefaultLength: '',
    redirectStatusCode: ''
  }
})
