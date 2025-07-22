<script lang="ts" setup>
interface Props {
  formData: DesignDTO
  showDeleteButton?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  save: []
  delete: []
}>()

const formDataModel = defineModel<DesignDTO>('formData', { required: true })
</script>

<template>
  <div class="px-8 py-6 bg-white">
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
        class="max-w-[600px]"
      />
    </main>
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
