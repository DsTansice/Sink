<script setup>
const route = useRoute()
</script>

<template>
  <Tabs
    :default-value="route.path"
    @update:model-value="navigateTo"
  >
    <TabsList>
      <TabsTrigger value="/dashboard">
        Analysis
      </TabsTrigger>
      <TabsTrigger value="/dashboard/links">
        Links
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
