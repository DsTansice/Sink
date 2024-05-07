import type { z } from 'zod'
import type { LinkSchema } from '@/server/schema/link'
import { parseHost } from 'ufo'
import { slugRegex } from '@/server/utils/slug'
import { UAParser } from 'ua-parser-js'
import {
  Bots,
  ExtraDevices,
  Emails,
  Tools
} from 'ua-parser-js/extensions';
import { parseAcceptLanguage } from 'intl-parse-accept-language';

export default eventHandler(async (event) => {
  const slug = event.path.slice(1) // remove leading slash
  if (slugRegex.test(slug)) {
    const link: z.infer<typeof LinkSchema> | null = await hubKV().get(`link:${slug}`)
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

      return sendRedirect(event, link.url, +(process.env.SINK_REDIRECT_STATUS_CODE || 301))
    }
  }
})
