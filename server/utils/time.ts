import type { H3Event } from 'h3'

export const getExpiration = (event: H3Event, expiration: number | undefined) => {
  const { previewMode } = useRuntimeConfig(event)
  if (previewMode) {
    const { previewTTL } = useAppConfig(event)
    expiration = Math.floor(Date.now() / 1000) + previewTTL
  }

  return expiration
}
