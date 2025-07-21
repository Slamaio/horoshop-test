<script lang="ts" setup>

</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-2 mb-5">
    <slot />

    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>

<style lang="scss" scoped>

</style>
