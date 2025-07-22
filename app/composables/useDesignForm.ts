export function useDesignForm(initialData?: Partial<DesignDTO>) {
  const formData = reactive<DesignDTO>({
    id: '',
    name: '',
    url: '',
    images: [],
    published: false,
    ...initialData,
  })

  const errors = ref<Record<string, string>>({})

  async function saveDesign(id: number | string | null = null) {
    try {
      errors.value = {}

      if (id !== null) {
        await $fetch(`/api/designs/${id}`, {
          method: 'PUT',
          body: formData,
        })
      }
      else {
        await $fetch('/api/designs', {
          method: 'POST',
          body: formData,
        })
      }

      await navigateTo('/')
    }
    catch (error: any) {
      console.error(`Error ${id !== null ? 'updating' : 'creating'} design:`, error)

      if (error?.data?.data && typeof error.data.data === 'object') {
        errors.value = error.data.data
      }

      throw error
    }
  }

  async function deleteDesign() {
    try {
      errors.value = {}

      await $fetch(`/api/designs/${formData.id}`, {
        method: 'DELETE',
      })
      await navigateTo('/')
    }
    catch (error: any) {
      console.error('Failed to delete design:', error)

      if (error?.data?.data && typeof error.data.data === 'object') {
        errors.value = error.data.data
      }

      throw error
    }
  }

  return {
    formData,
    errors,
    saveDesign,
    deleteDesign,
  }
}
