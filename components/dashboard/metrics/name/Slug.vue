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
    <!-- TODO: add url icon -->
    <span class="w-32 truncate">{{ name }}</span>
  </NuxtLink>
</template>
