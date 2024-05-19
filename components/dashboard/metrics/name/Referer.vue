<script setup>
defineProps({
  name: String,
})
</script>

<template>
  <a
    :href="`http://${name}`"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-start"
  >
    <Avatar
      class="w-4 h-4 mr-1"
    >
      <AvatarImage
        :src="`https://unavatar.io/${name}?fallback=false`"
        alt="@radix-vue"
      />
      <AvatarFallback>
        <img
          src="/sink.png"
          alt="Sink"
        >
      </AvatarFallback>
    </Avatar>
    <span class="w-32 truncate">{{ name }}</span>
  </a>
</template>
