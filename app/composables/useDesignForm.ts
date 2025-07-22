export function useDesignForm(initialData?: Partial<DesignDTO>) {
  const formData = reactive<DesignDTO>({
    id: '',
    name: '',
    url: '',
    images: [],
    published: false,
    ...initialData,
  })

  async function saveDesign(isEdit = false) {
    try {
      if (isEdit) {
        await $fetch(`/api/designs/${formData.id}`, {
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
    catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} design:`, error)
      throw error
    }
  }

  async function deleteDesign() {
    try {
      await $fetch(`/api/designs/${formData.id}`, {
        method: 'DELETE',
      })
      await navigateTo('/')
    }
    catch (error) {
      console.error('Failed to delete design:', error)
      throw error
    }
  }

  return {
    formData,
    saveDesign,
    deleteDesign,
  }
}
