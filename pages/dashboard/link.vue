<script setup>
const slug = useRoute().query.slug
const link = ref({})

const id = computed(() => link.value.id)
provide('id', id)

const getLink = async () => {
  const data = await useAPI('/api/link/query', {
    query: {
      slug,
    },
  })
  // data.id = 'y1c4fhirl5'
  link.value = data
}

onMounted(() => {
  getLink()
})
</script>

<template>
  <main class="space-y-6">
    <DashboardBreadcrumb title="Link" />
    <DashboardLinksLink
      :link="link"
    />
    <Dashboard
      v-if="link.id"
      :link="link"
    />
  </main>
</template>
