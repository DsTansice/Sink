<script setup>
import { VisSingleContainer, VisTopoJSONMap, VisTopoJSONMapSelectors } from '@unovis/vue'
import { WorldMapTopoJSON } from '@unovis/ts/maps'
import { ChartTooltip } from '@/components/ui/chart'

const areaData = ref([])

const id = inject('id')
const startAt = inject('startAt')
const endAt = inject('endAt')

const getMapData = async () => {
  areaData.value = []
  const { data } = await useAPI('/api/stats/metrics', {
    query: {
      type: 'country',
      id: id.value,
      startAt: startAt.value,
      endAt: endAt.value,
    },
  })
  if (Array.isArray(data)) {
    areaData.value = data.map((country) => {
      country.id = country.name
      return country
    })
  }
}

onMounted(() => {
  getMapData()
})

const stopWatchTime = watch([startAt, endAt], getMapData)

onBeforeUnmount(() => {
  stopWatchTime()
})

const valueFormatter = v => v
const Tooltip = {
  props: ['title', 'data'],
  setup(props) {
    const title = props.data[1]?.value?.name
    const data = [{
      name: props.title,
      value: props.data[3]?.value?.count,
      color: 'black',
    }]
    return () => h(ChartTooltip, { title, data })
  },
}
</script>

<template>
  <Card class="flex flex-col h-[620px]">
    <CardHeader>
      <CardTitle>Location</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 flex [&_[data-radix-aspect-ratio-wrapper]]:flex-1">
      <AspectRatio :ratio="65 / 30">
        <VisSingleContainer
          :data="{ areas: areaData }"
          class="h-full"
        >
          <VisTopoJSONMap :topojson="WorldMapTopoJSON" />
          <ChartSingleTooltip
            index="id"
            :selector="VisTopoJSONMapSelectors.feature"
            :items="areaData"
            :value-formatter="valueFormatter"
            :custom-tooltip="Tooltip"
          />
        </VisSingleContainer>
      </AspectRatio>
    </CardContent>
  </Card>
</template>
