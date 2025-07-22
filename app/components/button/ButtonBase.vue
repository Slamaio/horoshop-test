<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

defineProps({
  to: [String, Object] as PropType<string | RouteLocationRaw>,
})
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="button">
    <slot />
  </NuxtLink>

  <button v-else class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;

  min-height: 32px;
  min-width: 64px;
  padding-inline: 12px;
  padding-block: 6px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  outline-width: 1px;
  outline-style: solid;
  outline-offset: -1px;

  font-size: 0.875rem;
  line-height: 1.25rem;

  transition-property: color, background-color, outline-color;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
