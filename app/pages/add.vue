<script lang="ts" setup>
const { formData, errors, saveDesign, clearFieldError } = useDesignForm()

async function handleSave() {
  await saveDesign()
}

function handleClearFieldError(fieldName: string) {
  clearFieldError(fieldName)
}
</script>

<template>
  <DesignPageWrapper
    v-model="formData"
    :errors="errors"
    @save="handleSave"
    @clear-field-error="handleClearFieldError"
  />
</template>

<style lang="scss" scoped></style>
