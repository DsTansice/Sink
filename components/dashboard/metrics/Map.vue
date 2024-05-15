<script setup>
import { VisSingleContainer, VisTopoJSONMap, VisTopoJSONMapSelectors } from '@unovis/vue'
import { WorldMapTopoJSON } from '@unovis/ts/maps'
import { ChartTooltip } from '@/components/ui/chart'

const areaData = ref([])

const getMapData = async () => {
  const { data } = await useAPI('/api/stats/metrics', {
    query: {
      type: 'country',
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
  <VisSingleContainer
    :data="{ areas: areaData }"
    width="100%"
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
</template>
