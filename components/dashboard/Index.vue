<script setup>
import dayjs from 'dayjs'

const startAt = ref(dayjs().subtract('7', 'day').unix())
const endAt = ref(dayjs().unix())

provide('startAt', startAt)
provide('endAt', endAt)

const changeTime = (time) => {
  console.log(time)
  startAt.value = time[0]
  endAt.value = time[1]
}
</script>

<template>
  <main class="space-y-6">
    <DashboardBreadcrumb title="Analysis" />
    <DashboardNav>
      <DashboardTimePicker @update:time-range="changeTime" />
    </DashboardNav>
    <DashboardCounters />
    <DashboardViews />
    <DashboardMetrics />
  </main>
</template>
