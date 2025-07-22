<script lang="ts" setup>
defineProps({
  label: String,
})

const model = defineModel<boolean>()
</script>

<template>
  <label class="switch">
    <input v-model="model" type="checkbox" class="switch__input">
    <span class="switch__slider" />
    <span
      v-if="label"
      class="switch__label"
    >
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch__label {
  color: var(--color-black);
}

.switch__input {
  display: none;

  &:checked {
    & ~ .switch__label {
      color: var(--color-success);
    }

    & ~ .switch__slider {
      background-color: var(--color-success);

      &:before {
        -webkit-transform: translateX(40px);
        -ms-transform: translateX(40px);
        transform: translateX(40px);
      }
    }
  }

  &:focus + .switch__slider {
    box-shadow: 0 0 1px var(--color-gray-light);
  }
}

.switch__slider {
  cursor: pointer;
  position: relative;
  width: 64px;
  height: 24px;
  background-color: #e6e6e6;
  -webkit-transition: 300ms;
  transition: 300ms;
  border-radius: 14px;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: var(--color-white);
    -webkit-transition: 300ms;
    transition: 300ms;
    border-radius: 100%;
  }
}
</style>
