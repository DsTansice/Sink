<script setup>
defineProps({
  link: {
    type: Object,
    required: true,
  },
})
const { host, origin } = location
const timeformat = () => {
  // const options = {
  //   year: 'numeric',
  // }
  // return new Date(date * 1000).toLocaleDateString('en-US', options)
  return 2024
}
</script>

<template>
  <Card class="flex p-4">
    <Avatar>
      <AvatarImage
        src="https://github.com/radix-vue.png"
        alt="@radix-vue"
      />
      <AvatarFallback>S</AvatarFallback>
    </Avatar>

    <div class="flex-1 ml-3 overflow-hidden">
      <a
        class="text-lg font-bold"
        :href="`${origin}/${link.slug}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ host }}/{{ link.slug }}
      </a>
      <p class="mt-1 text-sm">
        {{ link.comment || link.title || link.description }}
      </p>
      <div class="flex w-full h-5 space-x-2 text-sm">
        <span>{{ timeformat(link.createdAt) }}</span>
        <template v-if="link.expiration">
          <Separator orientation="vertical" />
          <span>{{ timeformat(link.expiration) }}</span>
        </template>
        <Separator orientation="vertical" />
        <span class="truncate">{{ link.url }}</span>
      </div>
    </div>
  </Card>
</template>
