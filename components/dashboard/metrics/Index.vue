<template>
  <main class="grid gap-8 lg:grid-cols-6">
    <DashboardMetricsMap class="col-span-2 lg:col-span-4" />
    <DashboardMetricsGroup :tabs="['country', 'region', 'city']" />
    <DashboardMetricsGroup :tabs="['source', 'slug']" />
    <DashboardMetricsGroup :tabs="['os', 'browser', 'browserType']" />
    <DashboardMetricsGroup :tabs="['language', 'timezone']" />
    <DashboardMetricsGroup :tabs="['device', 'deviceType']" />
    <DashboardMetricsGroup :tabs="['UTMSource', 'UTMMedium']" />
    <DashboardMetricsGroup :tabs="['UTMCampaign', 'UTMTerm', 'UTMContent']" />
  </main>
</template>
