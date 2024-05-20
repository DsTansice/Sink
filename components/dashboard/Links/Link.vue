<script setup>
import { Link as LinkIcon, QrCode, CalendarPlus2, Hourglass } from 'lucide-vue-next'
import { parseURL } from 'ufo'
import QRCode from './QRCode.vue'

defineProps({
  link: {
    type: Object,
    required: true,
  },
})
const { host, origin } = location

const getLinkHost = (url) => {
  const { host } = parseURL(url)
  return host
}
const shortDate = (unix = 0) => {
  const shortDate = new Intl.DateTimeFormat({
    dateStyle: 'short',
  })
  return shortDate.format(unix * 1000)
}

const longDate = (unix = 0) => {
  return new Date(unix * 1000).toLocaleString()
}
</script>

<template>
  <Card>
    <NuxtLink
      class="flex flex-col p-4 space-y-3"
      :to="`/dashboard/link?slug=${link.slug}`"
    >
      <div class="flex items-center justify-center space-x-3">
        <Avatar>
          <AvatarImage
            :src="`https://unavatar.io/${getLinkHost(link.url)}?fallback=false`"
            alt="@radix-vue"
          />
          <AvatarFallback>
            <img
              src="/sink.png"
              alt="Sink"
            >
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 overflow-hidden ">
          <div>
            <p class="font-bold truncate text-md">
              {{ host }}/{{ link.slug }}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <p class="text-sm truncate">
                    {{ link.comment || link.title || link.description }}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ link.comment || link.title || link.description }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <HoverCard :open-delay="200">
          <HoverCardTrigger @click.prevent>
            <QrCode class="w-6 h-6" />
          </HoverCardTrigger>
          <HoverCardContent class="w-300 h-300">
            <QRCode
              :data="`${origin}/${link.slug}`"
              :image="`https://unavatar.io/${getLinkHost(link.url)}?fallback=https://sink.cool/sink.png`"
            />
          </HoverCardContent>
        </HoverCard>

        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          <LinkIcon class="w-6 h-6" />
        </a>
      </div>
      <div class="flex w-full h-5 space-x-2 text-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <span class="inline-flex items-center leading-5"><CalendarPlus2 class="w-4 h-4 mr-1" /> {{ shortDate(link.createdAt) }}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Created At: {{ longDate(link.createdAt) }}</p>
              <p>Updated At: {{ longDate(link.updatedAt) }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <template v-if="link.expiration">
          <Separator orientation="vertical" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <span class="inline-flex items-center leading-5"><Hourglass class="w-4 h-4 mr-1" /> {{ shortDate(link.expiration) }}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expires At: {{ longDate(link.expiration) }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </template>
        <Separator orientation="vertical" />
        <span class="truncate">{{ link.url }}</span>
      </div>
    </NuxtLink>
  </Card>
</template>
