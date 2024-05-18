<script setup>
import { IconBrandGithub } from '@tabler/icons-vue'
</script>

<template>
  <main
    class="grid pt-16 pb-8 lg:grid-cols-2 place-items-center md:py-12"
  >
    <div class="hidden py-6 md:order-1 md:block">
      <img
        src="https://static.miantiao.me/share/2024/4GKVzD/PHzXDJ.png"
        alt="Astronaut in the air"
        widths="{[200,400,600]}"
        sizes="(max-width: 800px) 100vw, 620px"
        loading="eager"
      >
    </div>
    <div>
      <h1
        class="text-5xl font-bold lg:text-6xl xl:text-7xl lg:tracking-tight xl:tracking-tighter"
      >
        Marketing website done with Astro
      </h1>
      <p class="max-w-xl mt-4 text-lg text-slate-600">
        Astroship is a starter template for startups, marketing websites & landing
        pages.<wbr> Built with Astro.build and TailwindCSS. You can quickly
        create any website with this starter.
      </p>
      <div class="flex flex-col gap-3 mt-6 sm:flex-row">
        <HomeLink
          href="#"
          target="_blank"
          class="flex items-center justify-center gap-1"
          rel="noopener"
        >
          <IconBrandGithub
            stroke="2"
            class="w-5 h-5"
          />

          Download for Free
        </HomeLink>
        <HomeLink
          size="lg"
          type="outline"
          rel="noopener"
          href="https://github.com/surjithctly/astroship"
          class="flex items-center justify-center gap-1"
          target="_blank"
        >
          <IconBrandGithub
            stroke="2"
            class="w-4 h-4"
          />
          GitHub Repo
        </HomeLink>
      </div>
    </div>
  </main>
</template>
