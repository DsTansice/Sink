<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
})
function type2name(type) {
  if (['os'].includes(type)) {
    return type.toUpperCase()
  }
  return type.replace(type[0], type[0].toUpperCase())
}
</script>

<template>
  <Tabs
    :default-value="tabs[0]"
    class="flex flex-col col-span-2"
  >
    <TabsList class="w-fit">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab"
        :value="tab"
      >
        {{ type2name(tab) }}
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="tab in tabs"
      :key="tab"
      :value="tab"
      class="flex-1"
    >
      <DashboardMetricsMetric
        :type="tab"
        class="h-full"
      />
    </TabsContent>
  </Tabs>
</template>
