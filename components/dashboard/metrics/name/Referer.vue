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
  >
    <Avatar
      class="w-5 h-5 p-0.5 float-left"
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
    <span class="w-32 leading-5 truncate">{{ name }}</span>
  </a>
</template>
