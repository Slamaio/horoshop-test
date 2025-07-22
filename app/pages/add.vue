<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'

const formData = reactive({
  id: '',
  name: '',
  url: '',
  images: [],
})

watchDebounced(
  () => formData.id,
  (newId) => {
    const regex = /^https:\/\/design\d*\.horoshop\.ua\/$/
    if (formData.url === '' || regex.test(formData.url)) {
      formData.url = newId ? `https://design${newId}.horoshop.ua/` : ''
    }
  },
  { debounce: 300, maxWait: 1000 },
)

async function saveDesign() {
  try {
    await $fetch('/api/designs', {
      method: 'POST',
      body: formData,
    })

    navigateTo('/')
  }
  catch (error) {
    console.error('Error saving design:', error)
  }
}
</script>

<template>
  <div class="px-8 py-6 bg-white">
    <AppHeader>
      <InputSwitch />

      <template #actions>
        <ButtonPrimary @click="saveDesign">
          Зберегти і вийти
        </ButtonPrimary>
      </template>
    </AppHeader>

    <main>
      <form class="flex flex-col gap-10 max-w-[600px]">
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
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
