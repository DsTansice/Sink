<script setup>
defineProps({
  name: String,
})
</script>

<template>
  <NuxtLink
    :to="`/dashboard/link?slug=${name}`"
    class="inline-flex items-center justify-start"
  >
    <span class="w-40 leading-5 truncate">{{ name }}</span>
  </NuxtLink>
</template>
