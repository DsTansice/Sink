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
function formatNumber(number) {
  if (!number || typeof Intl === 'undefined') {
    return number
  }
  return new Intl.NumberFormat('en').format(number)
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
            <DashboardMetricsName
              :name="metric.name"
              :type="type"
            />
          </TableCell>
          <TableCell
            class="py-3"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger class="w-full">
                  <Progress
                    v-model="metric.percent"
                    class="h-3"
                    :color="metric.color"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ metric.percent }}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
