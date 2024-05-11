<template>
  <main class="pt-16 md:py-12">
    <div class="md:pb-12">
      <h2 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">
        Everything you need to start a website
      </h2>
      <p class="mt-4 text-lg text-slate-600">
        Astro comes batteries included. It takes the best parts of state-of-the-art
        tools and adds its own innovations.
      </p>
    </div>

    <div class="grid gap-16 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="item in features"
        :key="item.title"
        class="flex items-start gap-4"
      >
        <div class="w-8 h-8 p-2 mt-1 bg-black rounded-full shrink-0">
          <IconClick
            class="text-white"
            stroke="2"
            :name="item.icon"
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold">
            {{ item.title }}
          </h3>
          <p class="mt-2 leading-relaxed text-slate-500">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { IconClick } from '@tabler/icons-vue'
import { ref } from 'vue'

const features = ref([
  {
    title: 'Bring Your Own Framework',
    description:
          'Build your site using React, Svelte, Vue, Preact, web components, or just plain ol\' HTML + JavaScript.',
    icon: 'bx:bxs-briefcase',
  },
  {
    title: '100% Static HTML, No JS',
    description:
          'Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.',
    icon: 'bx:bxs-window-alt',
  },
  {
    title: 'On-Demand Components',
    description:
          'Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.  ',
    icon: 'bx:bxs-data',
  },
  {
    title: 'Broad Integration',
    description:
          'Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.',
    icon: 'bx:bxs-bot',
  },
  {
    title: 'SEO Enabled',
    description:
          'Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!',
    icon: 'bx:bxs-file-find',
  },
  {
    title: 'Community',
    description:
          'Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.',
    icon: 'bx:bxs-user',
  },
])
</script>
