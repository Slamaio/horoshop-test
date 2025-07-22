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

  function clearFieldError(fieldName: string) {
    if (errors.value[fieldName]) {
      delete errors.value[fieldName]
    }
  }

  function clearAllErrors() {
    errors.value = {}
  }

  async function saveDesign(id: number | string | null = null) {
    try {
      clearAllErrors()

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
      clearAllErrors()

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
    clearFieldError,
    clearAllErrors,
  }
}
