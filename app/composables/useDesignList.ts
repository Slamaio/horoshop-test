export async function useDesignList() {
  const { data } = await useFetch('/api/designs', {
    method: 'GET',
    query: {
      page: 1,
    },
  })

  const designs = ref<Design[]>(data.value?.data || [])
  const paginationData = ref(data.value)

  async function loadMore() {
    if (!paginationData.value) {
      return
    }

    const newData = await $fetch('/api/designs', {
      method: 'GET',
      query: {
        page: paginationData.value.page + 1,
      },
    })

    if (newData?.data) {
      designs.value.push(...newData.data)
      paginationData.value = newData
    }
  }

  function canLoadMore() {
    return designs.value.length < (paginationData.value?.total || 0)
  }

  return {
    designs,
    paginationData,
    loadMore,
    canLoadMore,
  }
}
