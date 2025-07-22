<script lang="ts" setup>
const route = useRoute()
const id = route.params.id?.toString()
const { data } = await useFetch(`/api/designs/${id}`, {
  method: 'GET',
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
</script>

<template>
  <div class="px-8 py-6 bg-white">
    <AppHeader>
      <InputSwitch />

      <template #actions>
        <ButtonSecondary
          class="button--delete"
          @click="deleteDesign"
        >
          Видалити
        </ButtonSecondary>

        <ButtonPrimary>
          Зберегти і вийти
        </ButtonPrimary>
      </template>
    </AppHeader>

    <main>
      <p>data: {{ data }}</p>
      new design page
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
