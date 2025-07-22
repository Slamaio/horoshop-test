<script lang="ts" setup>
import InputTextField from '~/components/input/InputTextField.vue'
</script>

<template>
  <div class="px-8 py-6 bg-white">
    <AppHeader>
      <InputSwitch />

      <template #actions>
        <ButtonPrimary>
          Зберегти і вийти
        </ButtonPrimary>
      </template>
    </AppHeader>

    <main>
      <form class="flex flex-col gap-10">
        <InputMediaFile />

        <div class="flex flex-col gap-6">
          <div class="flex gap-2">
            <InputTextField />
            <InputTextField />
          </div>

          <InputTextField />
        </div>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
