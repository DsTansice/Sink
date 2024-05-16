<script setup>
import dayjs from 'dayjs'

const timeRange = ref('last-7d')

const emit = defineEmits(['update:timeRange'])

watch(timeRange, (newValue) => {
  switch (newValue) {
    case 'today':
      emit('update:timeRange', [dayjs().hour(0).unix(), dayjs().unix()])
      break
    case 'last-24h':
      emit('update:timeRange', [dayjs().subtract('24', 'hour').unix(), dayjs().unix()])
      break
    case 'this-week':
      emit('update:timeRange', [dayjs().day(0).unix(), dayjs().unix()])
      break
    case 'last-7d':
      emit('update:timeRange', [dayjs().subtract('7', 'day').unix(), dayjs().unix()])
      break
    case 'this-month':
      emit('update:timeRange', [dayjs().month(0).unix(), dayjs().unix()])
      break
    case 'last-30d':
      emit('update:timeRange', [dayjs().subtract('30', 'day').unix(), dayjs().unix()])
      break
    case 'last-90d':
      emit('update:timeRange', [dayjs().subtract('90', 'day').unix(), dayjs().unix()])
      break
    default:
      console.log('Custom time range')
      emit('update:timeRange', [null, null])
      break
  }
})
</script>

<template>
  <Select v-model="timeRange">
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="today">
        Today
      </SelectItem>
      <SelectItem value="last-24h">
        Last 24 hours
      </SelectItem>
      <SelectSeparator />
      <SelectItem value="this-week">
        This week
      </SelectItem>
      <SelectItem value="last-7d">
        Last 7 days
      </SelectItem>
      <SelectSeparator />
      <SelectItem value="this-month">
        This month
      </SelectItem>
      <SelectItem value="last-30d">
        Last 30 days
      </SelectItem>
      <SelectSeparator />
      <SelectItem value="last-90d">
        Last 90 days
      </SelectItem>
      <SelectSeparator />
      <SelectItem value="custom">
        Custom
      </SelectItem>
    </SelectContent>
  </Select>
</template>
