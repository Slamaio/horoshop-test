<script lang="ts" setup>
import { useInfiniteScroll } from '@vueuse/core'

const { designs, loadMore, canLoadMore } = await useDesignList()

const el = useTemplateRef<HTMLElement>('el')
useInfiniteScroll(
  document,
  async () => {
    await loadMore()
  },
  {
    distance: 700,
    canLoadMore,
  },
)
</script>

<template>
  <div class="px-8 py-6 bg-gray">
    <AppHeader>
      <h1 class="text-white text-xl/8 md:text-2xl">
        Всі дизайни
      </h1>

      <template #actions>
        <ButtonPrimary to="/add">
          Додати дизайн
        </ButtonPrimary>
      </template>
    </AppHeader>

    <main
      ref="el"
      class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-10"
    >
      <div
        v-if="designs.length === 0"
        class="col-span-full text-center text-gray-500"
      >
        Немає жодного дизайну
      </div>

      <NuxtLink
        v-for="design in designs"
        :key="design.id"
        :to="`/edit/${design.id}`"
        :class="{ 'opacity-50': !design.published }"
      >
        <DesignListItem
          :id="design.id"
          :image="design.images[0] || 'https://placehold.co/300x400?text=No+Image'"
          :name="design.name"
        />
      </NuxtLink>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
