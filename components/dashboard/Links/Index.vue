<script setup>
import { Loader } from 'lucide-vue-next'
import { useInfiniteScroll } from '@vueuse/core'

const links = ref([])
const limit = 24
let cursor = ''
let listComplete = false

const getLinks = async () => {
  if (listComplete) return
  const data = await useAPI('/api/link/list', {
    query: {
      limit,
      cursor,
    },
  })
  console.log(data)
  links.value = links.value.concat(data.links)
  cursor = data.cursor
  listComplete = data.list_complete
}

const { isLoading } = useInfiniteScroll(
  document,
  getLinks,
  { distance: 10 },
)
</script>

<template>
  <main class="space-y-6">
    <DashboardBreadcrumb title="Links" />
    <DashboardNav>
      <DashboardLinksCreate />
    </DashboardNav>
    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardLinksLink
        v-for="link in links"
        :key="link.id"
        :link="link"
      />
    </section>
    <div
      v-if="isLoading"
      class="flex items-center justify-center"
    >
      <Loader class="animate-spin" />
    </div>
  </main>
</template>
