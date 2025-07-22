<script lang="ts" setup>
const { formData, saveDesign } = useDesignForm()

async function handleSave() {
  await saveDesign(false)
}
</script>

<template>
  <DesignPageWrapper
    v-model:form-data="formData"
    @save="handleSave"
  />
</template>

<style lang="scss" scoped></style>
