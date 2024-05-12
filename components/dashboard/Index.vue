<template>
  <Card class="p-3 md:col-span-2 md:row-span-6 md:p-4">
    <CardHeader class="flex flex-row items-center justify-between px-1 pt-1 pb-5">
      <CardTitle class="text-2xl font-bold text-gray-800">
        Dashboard
      </CardTitle>
      <b>
        Today
      </b>
    </CardHeader>
    <main class="space-y-6">
      <DashboardStats />
      <DashboardViews />
      <DashboardMap />
    </main>
  </Card>
</template>
