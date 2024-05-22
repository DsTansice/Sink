import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sink Docs',
  description: 'Sink is a Simple Link Shortener with Analytics, 100% run on Cloudflare.',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '中文',
      lang: 'zh',
      link: '/zh/',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Sink', link: 'https://sink.cool' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Install', link: '/guide/install' },
          { text: 'Upgrade', link: '/guide/upgrade' },
        ],
      },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Frequent issues', link: '/frequent-issues' },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/ccbikai' },
      { icon: 'github', link: 'https://github.com/ccbikai/sink' },
    ],
  },
})
