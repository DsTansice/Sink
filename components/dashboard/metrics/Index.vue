<template>
  <main class="grid gap-8 lg:grid-cols-6">
    <DashboardMetricsMap class="col-span-1 lg:col-span-4" />
    <DashboardMetricsGroup
      class="lg:col-span-2"
      :tabs="['country', 'region', 'city']"
    />
    <DashboardMetricsGroup
      class="lg:col-span-3"
      :tabs="['referer', 'slug']"
    />
    <DashboardMetricsGroup
      class="lg:col-span-3"
      :tabs="['os', 'browser', 'browserType']"
    />
    <DashboardMetricsGroup
      class="lg:col-span-3"
      :tabs="['language', 'timezone']"
    />
    <DashboardMetricsGroup
      class="lg:col-span-3"
      :tabs="['device', 'deviceType']"
    />
  </main>
</template>
