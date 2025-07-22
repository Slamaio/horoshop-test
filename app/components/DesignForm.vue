<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'

const formData = defineModel({
  type: Object as PropType<DesignDTO>,
  default: () => ({
    id: '',
    name: '',
    url: '',
    images: [],
  }),
})

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
    />

    <div class="flex flex-col gap-4 sm:gap-6">
      <div class="flex gap-x-2 gap-y-4 sm:gap-y-6 flex-wrap">
        <InputTextField
          v-model="formData.id"
          placeholder="###"
          type="number"
          class="w-full sm:w-20"
        />
        <InputTextField
          v-model="formData.name"
          placeholder="Назва дизайну"
          class="grow"
        />
      </div>

      <InputTextField
        v-model="formData.url"
        placeholder="https://design###.horoshop.ua/"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>

</style>
