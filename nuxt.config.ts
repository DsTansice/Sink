// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthub/core', '@nuxt/eslint'],
  hub: {
    database: false,
    kv: true,
    blob: false,
    cache: false,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },
  appConfig: {
    previewTTL: 24 * 3600, // 24h
  },
  runtimeConfig: {
    siteToken: 'SinkCool',
    previewMode: '',
    slugDefaultLength: '6',
    redirectStatusCode: '301',
    aiModel: '@cf/meta/llama-2-7b-chat-int8',
    aiPrompt: `Help me recommend a SLUG for this URL.
      The URL is {url} , and the SLUG needs to pass the regular {slugRegex},
      Only the best one is returned,
      the format must be JSON reference {"slug": "example-slug"}`,
  },
})
