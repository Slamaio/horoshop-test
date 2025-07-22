<script lang="ts" setup>
const route = useRoute()
const id = route.params.id?.toString()
const { data } = await useFetch(`/api/designs/${id}`, {
  method: 'GET',
})

const formData = reactive<DesignDTO>({
  id: '',
  name: '',
  url: '',
  images: [],
  published: false,
})

watchEffect(() => {
  if (data.value) {
    Object.assign(formData, data.value)
  }
})

async function deleteDesign() {
  try {
    await $fetch(`/api/designs/${id}`, {
      method: 'DELETE',
    })
    navigateTo('/')
  }
  catch (error) {
    console.error('Failed to delete design:', error)
  }
}

async function saveDesign() {
  try {
    await $fetch(`/api/designs/${id}`, {
      method: 'PUT',
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
        <ButtonSecondary
          class="button--delete"
          @click="deleteDesign"
        >
          Видалити
        </ButtonSecondary>

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

<style lang="scss" scoped>
.button--delete {
  color: rgba(230, 22, 16, 1);

  &:active {
    color: rgba(230, 22, 16, 0.3);
  }
}
</style>
