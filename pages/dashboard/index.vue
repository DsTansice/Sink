<template>
  <main class="grid gap-4 xl:gap-5 md:grid-cols-2 xl:grid-cols-3">
    <ClientOnly>
      <Dashboard />

      <Card
        v-for="i in 60"
        :key="i"
        class="p-4"
      >
        <h2>Link</h2>
      </Card>
    </ClientOnly>
  </main>
</template>
