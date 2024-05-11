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

function toBlobNumber(blob: string) {
  return +blob.replace(/[^\d]/g, '')
}

export const blobsMap = {
  blob1: 'ua',
  blob2: 'ip',
  blob3: 'source',
  blob4: 'countryCode',
  blob5: 'country',
  blob6: 'region',
  blob7: 'city',
  blob8: 'timezone',
  blob9: 'language',
  blob10: 'os',
  blob11: 'browser',
  blob12: 'browserType',
  blob13: 'device',
  blob14: 'deviceType',
} as const

export type BlobsMap = typeof blobsMap
export type BlobsKey = keyof BlobsMap
export type LogsKey = BlobsMap[BlobsKey]
export type LogsMap = { [key in LogsKey]: string | undefined }

export const logsMap: LogsMap = Object.entries(blobsMap).reduce((acc, [k, v]) => ({ ...acc, [v]: k }), {}) as LogsMap

function logs2blobs(logs: LogsMap) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return Object.keys(blobsMap).sort((a, b) => toBlobNumber(a) - toBlobNumber(b)).map(key => logs[blobsMap[key]] || '')
}

function blobs2logs(blobs: string[]) {
  const logsList = Object.keys(blobsMap)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return blobs.reduce((logs: LogsMap, blob, i) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    logs[blobsMap[logsList[i]]] = blob
    return logs
  }, {})
}

export const useAccessLog = (event: H3Event) => {
  const ip = getHeader(event, 'x-real-ip') || getRequestIP(event, { xForwardedFor: true })

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
    console.log('access logs:', logs2blobs(accessLogs), blobs2logs(logs2blobs(accessLogs)))
    return Promise.resolve()
  }
}
