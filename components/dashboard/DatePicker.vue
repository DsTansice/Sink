<script setup>
import { now, startOfWeek, startOfMonth } from '@internationalized/date'

const startAt = inject('startAt')
const endAt = inject('endAt')

const dateRange = ref('last-7d')

const emit = defineEmits(['update:dateRange'])

const openCustomDateRange = ref(false)
const customDateRange = ref()
const locale = getLocale()

const updateCustomDateRange = (customDateRange) => {
  if (customDateRange.start && customDateRange.end) {
    openCustomDateRange.value = false
    emit('update:dateRange', [date2unix(customDateRange.start, 'start'), date2unix(customDateRange.end, 'end')])
  }
}

watch(dateRange, (newValue) => {
  switch (newValue) {
    case 'today':
      emit('update:dateRange', [date2unix(now(), 'start'), date2unix(now())])
      break
    case 'last-24h':
      emit('update:dateRange', [date2unix(now().subtract({ hours: 24 })), date2unix(now())])
      break
    case 'this-week':
      emit('update:dateRange', [date2unix(startOfWeek(now(), locale), 'start'), date2unix(now())])
      break
    case 'last-7d':
      emit('update:dateRange', [date2unix(now().subtract({ days: 7 })), date2unix(now())])
      break
    case 'this-month':
      emit('update:dateRange', [date2unix(startOfMonth(now()), 'start'), date2unix(now())])
      break
    case 'last-30d':
      emit('update:dateRange', [date2unix(now().subtract({ days: 30 })), date2unix(now())])
      break
    case 'last-90d':
      emit('update:dateRange', [date2unix(now().subtract({ days: 90 })), date2unix(now())])
      break
    case 'custom':
      openCustomDateRange.value = true
      dateRange.value = null
      break
    default:
      break
  }
})
</script>

<template>
  <Select v-model="dateRange">
    <SelectTrigger>
      <SelectValue v-if="dateRange" />
      <div v-else>
        {{ shortDate(startAt) }} - {{ shortDate(endAt) }}
      </div>
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

  <Dialog v-model:open="openCustomDateRange">
    <DialogContent class="w-auto max-w-full">
      <DialogHeader>
        <DialogTitle>Custom Date Range</DialogTitle>
      </DialogHeader>
      <RangeCalendar
        v-model="customDateRange"
        initial-focus
        :number-of-months="2"
        @update:model-value="updateCustomDateRange"
      />
    </DialogContent>
  </Dialog>
</template>
