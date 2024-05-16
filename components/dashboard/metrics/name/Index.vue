<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

function formatName(name, type) {
  if (!name || typeof Intl === 'undefined') {
    return name
  }
  if (type === 'country') {
    const regionNames = new Intl.DisplayNames([navigator.language], { type: 'region' })
    return regionNames.of(name)
  }
  if (type === 'language') {
    const languageNames = new Intl.DisplayNames([navigator.language], { type: 'language' })
    return languageNames.of(name)
  }
  return name
}
</script>

<template>
  <div>
    {{ formatName(name, type) || '(None)' }}
  </div>
</template>
