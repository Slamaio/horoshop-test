<script lang="ts" setup>
defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  error: String,
})

const model = defineModel({
  type: String,
  default: '',
})
</script>

<template>
  <div class="field" :class="{ 'field--error': error }">
    <label class="field__label-wrapper">
      <span
        v-if="label"
        class="field__label"
      >
        {{ label }}
      </span>

      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="field__input"
      >
    </label>

    <div v-if="error" class="field__error">
      <span class="field__error-text">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field__label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;

  // color: var(--color-black);
  // font-size: 0.875rem;
  // line-height: 1.25rem;
}

.field__input {
  min-height: 32px;
  outline: none;
  padding-inline: 12px;
  padding-block: 6px;
  border-radius: 3px;
  border: 1px solid var(--color-gray-light);

  &::placeholder {
    color: var(--color-gray-light);
  }

  &:focus {
    border-color: var(--color-black);
  }
}

// Error state

.field--error {
  .field__label {
    color: var(--color-error);
  }

  .field__input {
    border-color: var(--color-error);
  }
}

// Transitions

.field__label,
.field__input {
  transition-property: color, border-color;
  transition-duration: var(--default-transition-duration);
  transition-timing-function: var(--default-transition-timing-function);
}
</style>
