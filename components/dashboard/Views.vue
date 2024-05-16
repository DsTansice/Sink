<script setup>
const props = defineProps({
  id: {
    type: String,
  },
})

const views = ref([])

const startAt = inject('startAt')
const endAt = inject('endAt')

const OneDay = 24 * 60 * 60 // 1 day in seconds
function getUnit(startAt, endAt) {
  if (startAt && endAt && endAt - startAt <= OneDay) {
    return 'hour'
  }
  return 'day'
}

const getLinkViews = async () => {
  const { data } = await useAPI('/api/stats/views', {
    watch: props.id,
    query: {
      id: props.id,
      unit: getUnit(startAt.value, endAt.value),
      startAt: startAt.value,
      endAt: endAt.value,
    },
  })
  views.value = data || []
}

onMounted(async () => {
  getLinkViews()
})

const stopWatchTime = watch([startAt, endAt], getLinkViews)

onBeforeUnmount(() => {
  stopWatchTime()
})
</script>

<template>
  <Card class="p-6">
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
