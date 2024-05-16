<script setup>
import { IconMaximize } from '@tabler/icons-vue'
import { defaultColors } from '@/components/ui/chart'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const total = ref(0)
const metrics = ref([])
const top10 = ref([])

const getLinkMetrics = async () => {
  const { data } = await useAPI('/api/stats/metrics', {
    query: {
      type: props.type,
    },
  })
  if (Array.isArray(data)) {
    const colors = defaultColors(data.length)
    total.value = data.reduce((acc, cur) => acc + Number(cur.count), 0)
    metrics.value = data.map((item, i) => {
      item.color = colors[i]
      item.percent = Math.floor(item.count / total.value * 100) || (item.count ? 1 : 0)
      return item
    })
    top10.value = metrics.value.slice(0, 10)
  }
}

onMounted(() => {
  getLinkMetrics()
})
</script>

<template>
  <Card class="flex flex-col">
    <DashboardMetricsTable
      class="flex-1"
      :metrics="top10"
      :type="type"
    />
    <CardFooter v-if="metrics.length">
      <Dialog>
        <DialogTrigger
          as-child
          class="w-full mt-2"
        >
          <Button
            variant="link"
          >
            <IconMaximize
              class="w-4 h-4 mr-2"
              :stroke="2"
            /> DETAILS
          </Button>
        </DialogTrigger>
        <DialogContent class="max-w-[90svw] max-h-[90svh] md:max-w-screen-md grid-rows-[auto_minmax(0,1fr)_auto]">
          <DialogHeader>
            <DialogTitle>{{ type.toUpperCase() }}</DialogTitle>
          </DialogHeader>
          <DashboardMetricsTable
            class="grid overflow-y-auto"
            :metrics="metrics"
            :type="type"
          />
        </DialogContent>
      </Dialog>
    </CardFooter>
  </Card>
</template>
