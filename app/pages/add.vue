<script lang="ts" setup>
const formData = reactive<DesignDTO>({
  id: '',
  name: '',
  url: '',
  images: [],
  published: false,
})

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
      <InputSwitch
        v-model="formData.published"
        :label="formData.published ? 'Опублікований' : 'Неопублікований'"
      />

      <template #actions>
        <ButtonPrimary @click="saveDesign">
          Зберегти і вийти
        </ButtonPrimary>
      </template>
    </AppHeader>

    <main>
      <DesignForm
        v-model="formData"
        class="max-w-[600px]"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
