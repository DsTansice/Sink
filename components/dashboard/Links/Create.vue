<script setup>
// import { LinkSchema } from '@/schemas/link'

const props = defineProps({
  link: {
    type: Object,
    default: () => ({}),
  },
})
const link = ref(props.link)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        class="ml-2"
        variant="outline"
      >
        Create Link
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ link.id ? 'Edit Link' : 'Create Link' }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        ABC
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="button"
            variant="secondary"
          >
            Close
          </Button>
        </DialogClose>
        <Button type="submit">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
