<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <Tabs
    :default-value="tabs[0]"
    class="col-span-2"
  >
    <TabsList>
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab"
        :value="tab"
      >
        {{ tab }}
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="tab in tabs"
      :key="tab"
      :value="tab"
    >
      <DashboardMetricsMetric
        :type="tab"
      />
    </TabsContent>
  </Tabs>
</template>
