<script lang="ts" setup>
const { data } = await useFetch('/api/designs', {
  method: 'GET',
  query: {
    page: 1,
    limit: 10,
  },
})

const designs = computed(() => {
  const items = data.value?.data || []
  return items.sort((a, b) => Number(b.id) - Number(a.id))
})

async function initDesigns() {
  await useFetch('/api/designs', {
    method: 'POST',
    body: {
      id: 1,
      name: 'New Design',
      url: 'https://example.com/design',
      images: ['https://placehold.co/300x400'],
    },
  })

  await useFetch('/api/designs', {
    method: 'POST',
    body: {
      id: 2,
      name: 'New Design',
      url: 'https://example.com/design',
      images: ['https://placehold.co/300x400'],
    },
  })

  await useFetch('/api/designs', {
    method: 'POST',
    body: {
      id: 3,
      name: 'New Design',
      url: 'https://example.com/design',
      images: ['https://placehold.co/300x400'],
    },
  })
}

onMounted(async () => {
  await nextTick()
  await initDesigns()
})
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

    <main class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-10">
      <NuxtLink v-for="design in designs" :key="design.id" :to="`/edit/${design.id}`">
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
