<script setup>
import { IconClick } from '@tabler/icons-vue'

const features = ref([
  {
    title: 'URL Shortening',
    description:
          'Compress your URLs to their minimal length.',
    icon: 'bx:bxs-briefcase',
  },
  {
    title: 'Analytics',
    description:
          'Monitor link analytics and gather insightful statistics.',
    icon: 'bx:bxs-window-alt',
  },
  {
    title: 'Serverless',
    description:
          'Deploy without the need for traditional servers.',
    icon: 'bx:bxs-data',
  },
  {
    title: 'Customizable Slug',
    description:
          'Support for personalized slugs.',
    icon: 'bx:bxs-bot',
  },
  {
    title: 'AI Slug',
    description:
          'Leverage AI to generate slugs.',
    icon: 'bx:bxs-file-find',
  },
  {
    title: 'Link Expiration',
    description:
          'Set expiration dates for your links.',
    icon: 'bx:bxs-user',
  },
])
</script>

<template>
  <main class="pt-16 md:py-12">
    <div class="md:pb-12">
      <h2 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">
        Features
      </h2>
      <p class="mt-4 text-lg text-slate-600">
        Simple and sufficient functionality
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
