<script lang="ts" setup>

</script>

<template>
  <ButtonBase class="button--primary">
    <slot />
  </ButtonBase>
</template>

<style lang="scss" scoped>
.button--primary {
  color: var(--color-white);
  background-color: var(--color-active);
  outline-color: var(--color-outline);

  &:hover,
  &:active {
    background-color: var(--color-active-hover);
  }

  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
