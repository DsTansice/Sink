<script setup>
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Shuffle, Sparkles } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { DependencyType } from '@/components/ui/auto-form/interface'
import { LinkSchema, nanoid } from '@/schemas/link'

const EditLinkSchema = LinkSchema.pick({
  url: true,
  slug: true,
}).extend({
  optional: LinkSchema.omit({
    id: true,
    url: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
    title: true,
    description: true,
    image: true,
  }).extend({
    expiration: z.coerce.date().optional(),
  }).optional(),
})

const emit = defineEmits(['update:link'])
const props = defineProps({
  link: {
    type: Object,
    default: () => ({}),
  },
})
const link = ref(props.link)
const isEdit = !!props.link.id

const fieldConfig = {
  slug: {
    disabled: isEdit,
  },
  optional: {
    comment: {
      component: 'textarea',
    },
  },
}

const dependencies = [
  {
    sourceField: 'slug',
    type: DependencyType.DISABLES,
    targetField: 'slug',
    when: () => isEdit,
  },
]

const dialogOpen = ref(false)
const form = useForm({
  validationSchema: toTypedSchema(EditLinkSchema),
  initialValues: {
    slug: link.value.slug,
    url: link.value.url,
    optional: {
      comment: link.value.comment,
      expiration: link.value.expiration,
    },
  },
  validateOnMount: isEdit,
  keepValuesOnUnmount: isEdit,
})

const randomSlug = () => {
  form.setFieldValue('slug', nanoid()())
}

const aiSlug = async () => {
  if (!form.values.url) {
    return
  }
  const { slug } = await useAPI('/api/link/ai', {
    query: {
      url: form.values.url,
    },
  })
  form.setFieldValue('slug', slug)
}

const onSubmit = async (formData) => {
  const link = {
    url: formData.url,
    slug: formData.slug,
    ...(formData.optional || []),
    expiration: formData.optional?.expiration ? date2unix(formData.optional?.expiration, 'end') : undefined,
  }
  try {
    const { link: newLink } = await useAPI(isEdit ? '/api/link/edit' : '/api/link/create', {
      method: isEdit ? 'PUT' : 'POST',
      body: link,
    })
    dialogOpen.value = false
    emit('update:link', newLink, isEdit ? 'edit' : 'create')
    isEdit ? toast('Link updated successfully') : toast('Link created successfully')
  }
  catch (e) {
    toast(e?.message)
    console.error(e)
  }
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <slot>
        <Button
          class="ml-2"
          variant="outline"
          @click="randomSlug"
        >
          Create Link
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent class="max-w-[95svw] max-h-[95svh] md:max-w-screen-md grid-rows-[auto_minmax(0,1fr)_auto]">
      <DialogHeader>
        <DialogTitle>{{ link.id ? 'Edit Link' : 'Create Link' }}</DialogTitle>
      </DialogHeader>
      <AutoForm
        class="space-y-2"
        :schema="EditLinkSchema"
        :form="form"
        :field-config="fieldConfig"
        :dependencies="dependencies"
        @submit="onSubmit"
      >
        <template #slug="slotProps">
          <div
            v-if="!isEdit"
            class="relative"
          >
            <div class="absolute top-0 right-0 flex space-x-3">
              <Shuffle
                class="w-4 h-4 cursor-pointer"
                @click="randomSlug"
              />
              <Sparkles
                class="w-4 h-4 cursor-pointer"
                @click="aiSlug"
              />
            </div>
            <AutoFormField
              v-bind="slotProps"
            />
          </div>
        </template>
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
