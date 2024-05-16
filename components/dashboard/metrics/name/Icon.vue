<script setup>
import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandGoogle,
  IconBrandEdge,
  IconBrandChrome,
  IconBrandSafari,
  IconBrandWindows,
  IconBrandDebian,
  IconBrandFacebook,
  IconBrandUbuntu,
  IconBrandWechat,
  IconBrowser,
  IconDeviceDesktop,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceIpad,
} from '@tabler/icons-vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'browser',
  },
})

const iconMaps = {
  'android': IconBrandAndroid,
  'macos': IconBrandApple,
  'ios': IconBrandApple,
  'iphone': IconBrandApple,
  'ipod': IconBrandApple,
  'ipad': IconDeviceIpad,
  'macintosh': IconBrandApple,
  'edge': IconBrandEdge,
  'chrome': IconBrandChrome,
  'safari': IconBrandSafari,
  'debian': IconBrandDebian,
  'ubuntu': IconBrandUbuntu,
  'windows': IconBrandWindows,
  'mobile safari': IconBrandSafari,
  'mobile chrome': IconBrandChrome,
  'chrome headless': IconBrandChrome,
  'googlebot': IconBrandGoogle,
  'googlebot-image': IconBrandGoogle,
  'chromium': IconBrandChrome,
  'wechat': IconBrandWechat,
  'facebookexternalhit': IconBrandFacebook,
  'browser': IconBrowser,
  'os': IconDeviceDesktop,
  'desktop': IconDeviceDesktop,
  'tablet': IconDeviceTablet,
  'mobile': IconDeviceMobile,
  'laptop': IconDeviceLaptop,
}
</script>

<template>
  <div
    class="inline-flex items-center justify-start"
  >
    <component
      :is="iconMaps[name.toLowerCase()] || iconMaps[type]"
      stroke="2"
      class="w-4 h-4 mr-1"
    />
    <span class="w-32 truncate">{{ name }}</span>
  </div>
</template>
