<script setup>
import { MousePointerClick, Users, Flame } from 'lucide-vue-next'

const props = defineProps({
  id: {
    type: String,
  },
})

const counters = ref({
  visits: 0,
  visitors: 0,
  referers: 0,
})

const startAt = inject('startAt')
const endAt = inject('endAt')

const getLinkCounters = async () => {
  const { data } = await useAPI('/api/stats/counters', {
    watch: props.id,
    query: {
      id: props.id,
      startAt: startAt.value,
      endAt: endAt.value,
    },
  })
  counters.value = data?.[0]
}

onMounted(async () => {
  getLinkCounters()
})

const stopWatchTime = watch([startAt, endAt], getLinkCounters)

onBeforeUnmount(() => {
  stopWatchTime()
})
</script>

<template>
  <div class="grid gap-4 sm:gap-3 lg:gap-4 sm:grid-cols-3">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Visits
        </CardTitle>
        <MousePointerClick class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div
          class="text-2xl font-bold"
          :class="{ 'blur-lg': !counters.visits }"
        >
          {{ formatNumber(counters.visits) }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          +90
        </p> -->
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Visitors
        </CardTitle>
        <Users class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div
          class="text-2xl font-bold"
          :class="{ 'blur-lg': !counters.visitors }"
        >
          {{ formatNumber(counters.visitors) }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          +90
        </p> -->
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Referers
        </CardTitle>
        <Flame class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div
          class="text-2xl font-bold"
          :class="{ 'blur-lg': !counters.referers }"
        >
          {{ formatNumber(counters.referers) }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          -20
        </p> -->
      </CardContent>
    </Card>
  </div>
</template>
