<script setup>
import { toast } from 'vue-sonner'

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:link'])

const deleteLink = async () => {
  await useAPI('/api/link/delete', {
    method: 'DELETE',
    body: {
      slug: props.link.slug,
    },
  })
  emit('update:link', props.link, 'delete')
  toast('Delete successful!')
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will really delete your link from servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteLink">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
