<script setup>
import { IconMaximize } from '@tabler/icons-vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const id = inject('id')
const startAt = inject('startAt')
const endAt = inject('endAt')

const total = ref(0)
const metrics = ref([])
const top10 = ref([])

async function getLinkMetrics() {
  total.value = 0
  metrics.value = []
  top10.value = []
  const { data } = await useAPI('/api/stats/metrics', {
    query: {
      type: props.type,
      id: id.value,
      startAt: startAt.value,
      endAt: endAt.value,
    },
  })
  if (Array.isArray(data)) {
    const colors = colorGradation(data.length)
    total.value = data.reduce((acc, cur) => acc + Number(cur.count), 0)
    metrics.value = data.map((item, i) => {
      item.color = colors[i]
      item.percent = Math.floor(item.count / total.value * 100) || (item.count ? 1 : 0)
      return item
    })
    top10.value = metrics.value.slice(0, 10)
  }
}

const stopWatchTime = watch([startAt, endAt], getLinkMetrics)

onMounted(() => {
  getLinkMetrics()
})

onBeforeUnmount(() => {
  stopWatchTime()
})
</script>

<template>
  <Card class="flex flex-col">
    <template v-if="metrics.length">
      <DashboardMetricsTable
        class="flex-1"
        :metrics="top10"
        :type="type"
      />
      <CardFooter>
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
          <DialogContent class="max-w-[95svw] max-h-[95svh] md:max-w-screen-md grid-rows-[auto_minmax(0,1fr)_auto]">
            <DialogHeader>
              <DialogTitle>{{ name }}</DialogTitle>
            </DialogHeader>
            <DashboardMetricsTable
              class="overflow-y-auto"
              :metrics="metrics"
              :type="type"
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </template>
    <template v-else>
      <div class="flex items-center justify-between h-12 px-4">
        <Skeleton
          class="w-32 h-4 rounded-full"
        />
        <Skeleton
          class="w-20 h-4 rounded-full"
        />
      </div>
      <div
        v-for="i in 3"
        :key="i"
        class="px-4 py-4"
      >
        <Skeleton
          class="w-full h-4 rounded-full"
        />
      </div>
    </template>
  </Card>
</template>
