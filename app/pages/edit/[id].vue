<script lang="ts" setup>
const route = useRoute()
const id = route.params.id?.toString()

const { data } = await useFetch(`/api/designs/${id}`, {
  method: 'GET',
})

const { formData, saveDesign, deleteDesign } = useDesignForm(data.value)

// watchEffect(() => {
//   if (data.value) {
//     Object.assign(formData, data.value)
//   }
// })

async function handleSave() {
  await saveDesign(true)
}

async function handleDelete() {
  await deleteDesign()
}
</script>

<template>
  <DesignPageWrapper
    v-model:form-data="formData"
    show-delete-button
    @save="handleSave"
    @delete="handleDelete"
  />
</template>

<style lang="scss" scoped></style>
