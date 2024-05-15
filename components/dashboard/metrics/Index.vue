<template>
  <main class="grid gap-8 md:grid-cols-6">
    <DashboardMetricsMap class="col-span-2 md:col-span-4" />
    <DashboardMetricsGroup :tabs="['country', 'region', 'city']" />
    <DashboardMetricsGroup :tabs="['language', 'timezone']" />
    <DashboardMetricsGroup :tabs="['os', 'browser', 'browserType']" />
    <DashboardMetricsGroup :tabs="['device', 'deviceType']" />
  </main>
</template>
