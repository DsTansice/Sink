import type { H3Event } from 'h3'
import { parseURL } from 'ufo'
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
  blob1: 'ua',
  blob10: 'ip',
  blob11: 'source',
  blob12: 'countryCode',
  blob13: 'country',
  blob14: 'region',
  blob15: 'city',
  blob16: 'timezone',
  blob17: 'language',
  blob18: 'os',
  blob19: 'browser',
  blob2: 'browserType',
  blob20: 'device',
  blob3: 'deviceType',
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
  const { host: source } = parseURL(referer)

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
