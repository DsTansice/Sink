<script setup>
import { Link as LinkIcon, QrCode, CalendarPlus2, Hourglass, Copy, CopyCheck, SquarePen, SquareChevronDown, Eraser } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { parseURL } from 'ufo'
import QRCode from './QRCode.vue'

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:link'])

const updateLink = (link, type) => {
  emit('update:link', link, type)
}

const { host, origin } = location

const getLinkHost = (url) => {
  const { host } = parseURL(url)
  return host
}

const shortLink = computed(() => `${origin}/${props.link.slug}`)
const linkIcon = computed(() => `https://unavatar.io/${getLinkHost(props.link.url)}?fallback=https://sink.cool/sink.png`)

const { copy, copied } = useClipboard({ source: shortLink.value, copiedDuring: 400 })
</script>

<template>
  <Card v-if="link.id">
    <NuxtLink
      class="flex flex-col p-4 space-y-3"
      :to="`/dashboard/link?slug=${link.slug}`"
    >
      <div class="flex items-center justify-center space-x-3">
        <Avatar>
          <AvatarImage
            :src="linkIcon"
            alt="@radix-vue"
          />
          <AvatarFallback>
            <img
              src="/sink.png"
              alt="Sink"
            >
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 overflow-hidden">
          <div class="flex items-center">
            <div class="font-bold leading-5 truncate text-md">
              {{ host }}/{{ link.slug }}
            </div>

            <CopyCheck
              v-if="copied"
              class="w-4 h-4 ml-1 shrink-0"
              @click.prevent
            />
            <Copy
              v-else
              class="w-4 h-4 ml-1 shrink-0"
              @click.prevent="copy(shortLink);toast('Copy successful!')"
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <p class="text-sm truncate">
                  {{ link.comment || link.title || link.description }}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p class="max-w-[90svw] break-all">
                  {{ link.comment || link.title || link.description }}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          <LinkIcon class="w-5 h-5" />
        </a>

        <Popover>
          <PopoverTrigger>
            <QrCode
              class="w-5 h-5"
              @click.prevent
            />
          </PopoverTrigger>
          <PopoverContent>
            <QRCode
              :data="shortLink"
              :image="linkIcon"
            />
          </PopoverContent>
        </Popover>

        <Menubar
          class="!ml-0 border-none !-mr-4"
        >
          <MenubarMenu>
            <MenubarTrigger
              class="px-2"
              @click.prevent
            >
              <SquareChevronDown class="w-5 h-5" />
            </MenubarTrigger>
            <MenubarContent
              class="min-w-0"
            >
              <MenubarItem>
                <DashboardLinksEditor
                  :link="link"
                  @update:link="updateLink"
                >
                  <div
                    class="flex"
                    @click.stop
                  >
                    <SquarePen
                      class="w-5 h-5 mr-2"
                    />
                    Edit
                  </div>
                </DashboardLinksEditor>
              </MenubarItem>

              <MenubarSeparator />
              <MenubarItem>
                <DashboardLinksDelete
                  :link="link"
                  @update:link="updateLink"
                >
                  <div
                    class="flex"
                    @click.stop
                  >
                    <Eraser
                      class="w-5 h-5 mr-2"
                    /> Delete
                  </div>
                </DashboardLinksDelete>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
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
