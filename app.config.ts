export default defineAppConfig({
  previewTTL: 24 * 3600, // 24h
  slugRegex: /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/i,
})
