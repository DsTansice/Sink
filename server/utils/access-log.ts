import type { H3Event } from 'h3'
import { parseHost } from 'ufo'
import { UAParser } from 'ua-parser-js'
import {
  Apps,
  Bots,
  CLIs,
  ExtraDevices,
  Emails,
  MediaPlayers,
  Modules,
} from 'ua-parser-js/extensions'
import { parseAcceptLanguage } from 'intl-parse-accept-language'

export const useAccessLog = (event: H3Event) => {
  const ip = getRequestIP(event, {xForwardedFor: true})

  const referer = getHeader(event, 'referer')
  const { hostname: source } = parseHost(referer)

  const acceptLanguage = getHeader(event, 'accept-language') || ''
  const language = (parseAcceptLanguage(acceptLanguage) || [])[0]

  const userAgent = getHeader(event, 'user-agent') || ''
  const uaInfo = (new UAParser(userAgent, {
    browser: [Apps.browser || [], Bots.browser || [], CLIs.browser || [], Emails.browser || [], MediaPlayers.browser || [], Modules.browser || []].flat(),
    device: [ExtraDevices.device || []].flat(),
  })).getResult()

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const { request: { cf } } = event.context.cloudflare
  const link = event.context.link || {}

  // const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  // languageNames.of(language)

  if (process.env.NODE_ENV === 'production') {
    return hubAnalytics().put({
      indexes: [link.id, link.slug],
      blobs: [],
    })
  }
  else {
    console.log('client info:', {
      ua: userAgent,
      ip,
      source,
      countryCode: cf?.country,
      country: regionNames.of(cf?.country),
      region: cf?.region,
      city: cf?.city,
      timezone: cf?.timezone,
      language,
      os: uaInfo?.os?.name,
      browser: uaInfo?.browser?.name,
      // @ts-expect-error
      browserType: uaInfo?.browser?.type,
      device: uaInfo?.device?.model,
      deviceType: uaInfo?.device?.type,
    })
    return Promise.resolve()
  }
}
