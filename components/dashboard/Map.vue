<script setup>
import { VisSingleContainer, VisTopoJSONMap, VisTopoJSONMapSelectors } from '@unovis/vue'
import { WorldMapTopoJSON } from '@unovis/ts/maps'
import { ChartTooltip } from '@/components/ui/chart'

const countryCodes = [
  'AU', 'BR', 'CN', 'EG', 'FR', 'IN', 'JP', 'MX', 'NO', 'PE', 'PH', 'RU', 'TZ', 'US',
]
const areaData = countryCodes.map(id => ({ id, count: '110' }))
const data = { areas: areaData }

const valueFormatter = v => v
const Tooltip = {
  props: ['title', 'data'],
  setup(props) {
    // console.log(toRaw(props))
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
  <VisSingleContainer :data="data">
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
