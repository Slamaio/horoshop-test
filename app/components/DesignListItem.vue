<script lang="ts" setup>
defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col gap-4 transition-transform duration-150 hover:scale-105">
    <img :src="image" alt="" class="rounded-sm">

    <div class="flex items-center gap-2">
      <span class="h-4 px-1 text-black bg-white rounded-lg text-[11px]/[18px] flex items-center justify-center">
        {{ id }}
      </span>
      <span class="text-white text-base/[18px]">
        {{ name }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
