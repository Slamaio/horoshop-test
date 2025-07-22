<script lang="ts" setup>
const route = useRoute()
const id = route.params.id?.toString()

const { data } = await useFetch(`/api/designs/${id}`, {
  method: 'GET',
})

const { formData, errors, saveDesign, deleteDesign, clearFieldError } = useDesignForm(data.value)

// watchEffect(() => {
//   if (data.value) {
//     Object.assign(formData, data.value)
//   }
// })

async function handleSave() {
  await saveDesign(id)
}

async function handleDelete() {
  await deleteDesign()
}

function handleClearFieldError(fieldName: string) {
  clearFieldError(fieldName)
}
</script>

<template>
  <DesignPageWrapper
    v-model="formData"
    :errors="errors"
    show-delete-button
    @save="handleSave"
    @delete="handleDelete"
    @clear-field-error="handleClearFieldError"
  />
</template>

<style lang="scss" scoped></style>
