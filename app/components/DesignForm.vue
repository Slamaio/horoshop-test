<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'

defineProps({
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
})

// Used emits for simplicity, but store like Pinia or Vuex is preffered for larger applications
const emit = defineEmits<{
  clearFieldError: [fieldName: string]
}>()

const formData = defineModel({
  type: Object as PropType<DesignDTO>,
  default: () => ({
    id: '',
    name: '',
    url: '',
    images: [],
  }),
})

watch(() => formData.value.id, () => {
  emit('clearFieldError', 'id')
})

watch(() => formData.value.name, () => {
  emit('clearFieldError', 'name')
})

watch(() => formData.value.url, () => {
  emit('clearFieldError', 'url')
})

watch(() => formData.value.images, () => {
  emit('clearFieldError', 'images')
}, { deep: true })

watchDebounced(
  () => formData.value.id,
  (newId) => {
    const regex = /^https:\/\/design\d*\.horoshop\.ua\/$/
    if (formData.value.url === '' || regex.test(formData.value.url)) {
      formData.value.url = newId ? `https://design${newId}.horoshop.ua/` : ''
    }
  },
  { debounce: 300, maxWait: 1000 },
)
</script>

<template>
  <form class="flex flex-col gap-10 ">
    <InputMediaFile
      v-model="formData.images"
      accept="image/*"
      :error="errors.images"
    />

    <div class="flex flex-col gap-4 sm:gap-6">
      <div class="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap">
        <InputTextField
          v-model="formData.id"
          placeholder="###"
          type="number"
          class="w-full sm:w-20"
          :error="errors.id"
        />
        <InputTextField
          v-model="formData.name"
          placeholder="Назва дизайну"
          class="grow"
          :error="errors.name"
        />
      </div>

      <InputTextField
        v-model="formData.url"
        placeholder="https://design###.horoshop.ua/"
        :error="errors.url"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>

</style>
