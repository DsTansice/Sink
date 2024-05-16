<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
function formatName(name, type) {
  if (type === 'country') {
    return name.toUpperCase()
  }
  return name
}
function formatNumber(number) {
  return new Intl.NumberFormat().format(number)
}
</script>

<template>
  <main>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-1/5">
            Name
          </TableHead>
          <TableHead />
          <TableHead class="w-1/5 text-right">
            Count
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="metric in metrics"
          :key="metric.name"
        >
          <TableCell class="py-3 font-medium">
            {{ formatName(metric.name) || '(None)' }}
          </TableCell>
          <TableCell
            class="py-3"
          >
            <Progress
              v-model="metric.percent"
              class="h-3"
              :color="metric.color"
            />
          </TableCell>
          <TableCell class="py-3 text-right">
            {{ formatNumber(metric.count) }}
          </TableCell>
        </TableRow>
      </TableBody>
    <!-- <TableFooter>FullScreen</TableFooter> -->
    </Table>
  </main>
</template>
