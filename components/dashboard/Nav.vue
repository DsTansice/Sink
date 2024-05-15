<script setup>
const route = useRoute()
</script>

<template>
  <nav class="flex justify-between">
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
    <div>
      <slot />
    </div>
  </nav>
</template>
