<script lang="ts" setup>
defineProps({
  showDeleteButton: Boolean,
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  save: []
  delete: []
  clearFieldError: [fieldName: string]
}>()

const formDataModel = defineModel<DesignDTO>({ required: true })

function handleClearFieldError(fieldName: string) {
  emit('clearFieldError', fieldName)
}
</script>

<template>
  <div class="px-8 py-6 bg-white flex max-sm:flex-col gap-8 sm:gap-16 flex-wrap">
    <aside>
      <NuxtLink to="/">
        <IconArrow class="text-black size-6 hover:scale-125 transition-transform" />
      </NuxtLink>
    </aside>

    <div class="grow">
      <AppHeader>
        <InputSwitch
          v-model="formDataModel.published"
          :label="formDataModel.published ? 'Опублікований' : 'Неопублікований'"
        />

        <template #actions>
          <ButtonSecondary
            v-if="showDeleteButton"
            class="button--delete"
            @click="emit('delete')"
          >
            Видалити
          </ButtonSecondary>

          <ButtonPrimary @click="emit('save')">
            Зберегти і вийти
          </ButtonPrimary>
        </template>
      </AppHeader>

      <main>
        <DesignForm
          v-model="formDataModel"
          :errors="errors || {}"
          class="max-w-[600px]"
          @clear-field-error="handleClearFieldError"
        />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button--delete {
  color: rgba(230, 22, 16, 1);

  &:active {
    color: rgba(230, 22, 16, 0.3);
  }
}
</style>
