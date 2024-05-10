// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthub/core', '@nuxt/eslint'],
  hub: {
    analytics: true,
    blob: false,
    cache: false,
    database: false,
    kv: true,
    // ai: true,
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
  runtimeConfig: {
    siteToken: 'SinkCool',
    previewMode: '',
    slugDefaultLength: '6',
    redirectStatusCode: '301',
    aiModel: '@cf/meta/llama-3-8b-instruct',
    aiPrompt: `You are a URL shortener. Please shorten the URL given by the user to a SLUG. SLUG is human-readable, no more than three words and can pass the regular expression {slugRegex}. Only the best one is returned, the format must be JSON reference {"slug": "example-slug"}`,
  },
})
