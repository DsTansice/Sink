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
  const ip = getHeader(event, 'x-real-ip')

  const referer = getHeader(event, 'referer')
  const { hostname: source } = parseHost(referer)

  const acceptLanguage = getHeader(event, 'accept-language') || ''
  const language = (parseAcceptLanguage(acceptLanguage) || [])[0]

  const userAgent = getHeader(event, 'user-agent') || ''
  const uaInfo = (new UAParser(userAgent, {
    browser: [Apps.browser || [], Bots.browser || [], CLIs.browser || [], Emails.browser || [], MediaPlayers.browser || [], Modules.browser || []].flat(),
    device: [ExtraDevices.device || []].flat(),
  })).getResult()

  console.log({
    ua: userAgent,
    ip,
    source,
    language,
    os: uaInfo?.os?.name,
    browser: uaInfo?.browser?.name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    browserType: uaInfo?.browser?.type,
    device: uaInfo?.device?.model,
    deviceType: uaInfo?.device?.type,
  })

  return hubAnalytics()
}
