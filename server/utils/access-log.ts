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

export const blobMap: { [x: string]: string } = {
  blob00: 'ua',
  blob01: 'ip',
  blob02: 'source',
  blob03: 'countryCode',
  blob04: 'country',
  blob05: 'region',
  blob06: 'city',
  blob07: 'timezone',
  blob08: 'language',
  blob09: 'os',
  blob10: 'browser',
  blob11: 'browserType',
  blob12: 'device',
  blob13: 'deviceType',
}

export const logsMap = Object.entries(blobMap).reduce((acc, [k, v]) => ({ ...acc, [v]: k }), {})

export function logs2blobs(logs: { [x: string]: string | undefined }) {
  return Object.keys(blobMap).sort((a, b) => a.localeCompare(b, 'en')).map(key => logs[blobMap[key]] || '')
}

export function blobs2logs(blobs: string[]) {
  const logsList = Object.keys(blobMap)
  return blobs.reduce((logs: { [x: string]: string }, blob, i) => {
    logs[blobMap[logsList[i]]] = blob
    return logs
  }, {})
}

export const useAccessLog = (event: H3Event) => {
  const ip = getRequestIP(event, { xForwardedFor: true })

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

  const accessLogs = {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    browserType: uaInfo?.browser?.type,
    device: uaInfo?.device?.model,
    deviceType: uaInfo?.device?.type,
  }

  if (process.env.NODE_ENV === 'production') {
    return hubAnalytics().put({
      indexes: [link.id], // only one index
      blobs: logs2blobs(accessLogs),
    })
  }
  else {
    console.log('access logs:', blobs2logs(logs2blobs(accessLogs)))
    return Promise.resolve()
  }
}
