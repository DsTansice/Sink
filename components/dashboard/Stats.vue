<script setup>
import { MousePointerClick } from 'lucide-vue-next'

const props = defineProps({
  id: {
    type: String,
  },
})

const counters = ref({})

const getLinkStats = async () => {
  const { data } = await useAPI('/api/stats/counters', {
    watch: props.id,
    query: {
      id: props.id,
    },
  })
  counters.value = data?.value?.[0]
}

onMounted(async () => {
  await nextTick()
  getLinkStats()
})
</script>

<template>
  <div class="grid gap-4 sm:gap-3 lg:gap-4 sm:grid-cols-3">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Views
        </CardTitle>
        <MousePointerClick class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ counters.views }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          +20.1% from last month
        </p> -->
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Visitors
        </CardTitle>
        <MousePointerClick class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ counters.visitors }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          +180.1% from last month
        </p> -->
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Referers
        </CardTitle>
        <MousePointerClick class="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ counters.referers }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">
          +19% from last month
        </p> -->
      </CardContent>
    </Card>
  </div>
</template>
