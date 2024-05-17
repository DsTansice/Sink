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
      size="sm"
      class="w-4 h-4 mr-1"
    >
      <AvatarImage
        :src="`https://icons.duckduckgo.com/ip3/${name}.ico`"
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
