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
  views.value = data || []
}

onMounted(async () => {
  await nextTick()
  getLinkViews()
})
</script>

<template>
  <Card class="p-4">
    <CardTitle>
      Views
    </CardTitle>
    <BarChart
      :data="views"
      index="time"
      type="stacked"
      :categories="['visits', 'visitors']"
    />
  </Card>
</template>
