<script setup>
import {
  IconBrandApple,
  IconBrandChrome,
  IconBrandDebian,
  IconBrandEdge,
  IconBrandFacebook,
  IconBrandFirefox,
  IconBrandGoogle,
  IconBrandOpera,
  IconBrandSafari,
  IconBrandUbuntu,
  IconBrandWechat,
  IconBrandYandex,
  IconBrowser,
  IconDeviceDesktop,
  IconDeviceIpad,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconTerminal2,
} from '@tabler/icons-vue'

// https://vue3-simple-icons.wyatt-herkamp.dev/
import {
  AndroidIcon,
  HuaweiIcon,
  IOsIcon,
  InternetExplorerIcon,
  LinuxIcon,
  MacOsIcon,
  SamsungIcon,
  VivoIcon,
  WindowsIcon,
  XiaomiIcon,
} from 'vue3-simple-icons'

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
  'android': AndroidIcon,
  'iphone': IconBrandApple,
  'ipod': IconBrandApple,
  'ipad': IconDeviceIpad,
  'macintosh': IconBrandApple,
  'edge': IconBrandEdge,
  'ie': InternetExplorerIcon,
  'chrome': IconBrandChrome,
  'safari': IconBrandSafari,
  'debian': IconBrandDebian,
  'ubuntu': IconBrandUbuntu,
  'windows': WindowsIcon,
  'opera': IconBrandOpera,
  'mobile safari': IconBrandSafari,
  'mobile chrome': IconBrandChrome,
  'chrome headless': IconBrandChrome,
  'chrome webview': IconBrandChrome,
  'googlebot': IconBrandGoogle,
  'googlebot-image': IconBrandGoogle,
  'chromium': IconBrandChrome,
  'wechat': IconBrandWechat,
  'facebookexternalhit': IconBrandFacebook,
  'facebook': IconBrandFacebook,
  'firefox': IconBrandFirefox,
  'mobile firefox': IconBrandFirefox,
  'yandex': IconBrandYandex,
  'browser': IconBrowser,
  'os': IconDeviceDesktop,
  'desktop': IconDeviceDesktop,
  'tablet': IconDeviceTablet,
  'mobile': IconDeviceMobile,
  'laptop': IconDeviceLaptop,
  'curl': IconTerminal2,
  'vivo browser': VivoIcon,
  'huawei browser': HuaweiIcon,
  'harmonyos': HuaweiIcon,
  'miui browser': XiaomiIcon,
  'macos': MacOsIcon,
  'ios': IOsIcon,
  'linux': LinuxIcon,
  'samsung internet': SamsungIcon,
}
</script>

<template>
  <component
    :is="iconMaps[name.toLowerCase()] || iconMaps[type]"
    stroke="2"
    class="w-5 h-5 py-0.5 float-left"
  />
  <span class="w-32 leading-5 truncate">{{ name }}</span>
</template>
