<script lang="ts" setup>
const { formData, errors, saveDesign } = useDesignForm()

async function handleSave() {
  await saveDesign()
}
</script>

<template>
  <DesignPageWrapper
    v-model="formData"
    :errors="errors"
    @save="handleSave"
  />
</template>

<style lang="scss" scoped></style>
