<script setup>
const slug = useRoute().query.slug
const link = ref({})

const id = computed(() => link.value.id)
provide('id', id)

async function getLink() {
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

function updateLink(link, type) {
  if (type === 'delete')
    navigateTo('/dashboard/links')
}
</script>

<template>
  <main class="space-y-6">
    <DashboardBreadcrumb title="Link" />
    <DashboardLinksLink
      :link="link"
      @update:link="updateLink"
    />
    <Dashboard
      v-if="link.id"
      :link="link"
    />
  </main>
</template>
