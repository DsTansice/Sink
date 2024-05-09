import type { z } from 'zod'
import { parseHost } from 'ufo'
import { UAParser } from 'ua-parser-js'
import {
  Bots,
  ExtraDevices,
  Emails,
  Tools,
} from 'ua-parser-js/extensions'
import { parseAcceptLanguage } from 'intl-parse-accept-language'
import { slugRegex } from '~/utils/slug'
import type { LinkSchema } from '@/server/schema/link'

export default eventHandler(async (event) => {
  console.log(useRuntimeConfig(event))
  const slug = event.path.slice(1) // remove leading slash
  if (slugRegex.test(slug)) {
    const { cloudflare } = event.context
    const { KV } = cloudflare.env
    const link: z.infer<typeof LinkSchema> | null = await KV.get(`link:${slug}`, { type: 'text' })
    if (link) {
      const ip = getHeader(event, 'x-real-ip')

      const referer = getHeader(event, 'referer')
      const { hostname: source } = parseHost(referer)

      const acceptLanguage = getHeader(event, 'accept-language') || ''
      const language = (parseAcceptLanguage(acceptLanguage) || [])[0]

      const userAgent = getHeader(event, 'user-agent') || ''
      const uaInfo = (new UAParser(userAgent, {
        browser: [...Bots.browser, ...Emails.browser, ...Tools.browser],
        device: [...ExtraDevices.device],
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

      return sendRedirect(event, link.url, +useRuntimeConfig(event).redirectStatusCode)
    }
  }
})
