<script setup>
// import { z } from 'zod'
import { LinkSchema } from '@/schemas/link'

const CreateLinkSchema = LinkSchema.pick({
  url: true,
  slug: true,
}).extend({
  optional: LinkSchema.omit({
    id: true,
    url: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
  }).optional(),
})

console.log(CreateLinkSchema)

const props = defineProps({
  link: {
    type: Object,
    default: () => ({}),
  },
})
const link = ref(props.link)

const onSubmit = (values) => {
  console.log(values)
}
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
      <AutoForm
        class="space-y-2"
        :schema="CreateLinkSchema"
        @submit="onSubmit"
      >
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
      </AutoForm>
    </DialogContent>
  </Dialog>
</template>
