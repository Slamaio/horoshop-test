<script lang="ts" setup>

</script>

<template>
  <ButtonBase class="button--secondary">
    <slot />
  </ButtonBase>
</template>

<style lang="scss" scoped>
.button--secondary {
  color: var(--color-black);
  background-color: var(--color-white);
  outline-color: rgba(0, 0, 0, 0.2);

  &:hover {
    outline-color: rgba(0, 0, 0, 0.35);
  }

  &:active {
    color: rgba(34, 34, 34, 0.3);
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
