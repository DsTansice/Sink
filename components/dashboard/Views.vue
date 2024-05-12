<script setup>
const props = defineProps({
  id: {
    type: String,
  },
})

const views = ref([])

const getLinkViews = async () => {
  const { data } = await useAPI('/api/stats/views', {
    watch: props.id,
    query: {
      id: props.id,
      unit: 'hour',
    },
  })
  views.value = data?.value || []
}

onMounted(async () => {
  await nextTick()
  getLinkViews()
})
</script>

<template>
  <BarChart
    :data="views"
    index="time"
    type="stacked"
    :categories="['views', 'visitors']"
  />
</template>
