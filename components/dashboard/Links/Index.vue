<script setup>
const links = ref([])

const getLinks = async () => {
  const data = await useAPI('/api/link/list')
  console.log(data)
  links.value = data.links
}

onMounted(() => {
  getLinks()
})
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
  </main>
</template>
