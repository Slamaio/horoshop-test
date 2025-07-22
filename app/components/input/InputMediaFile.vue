<script lang="ts" setup>
const props = defineProps({
  accept: {
    type: String,
    default: '',
  },
  error: String,
})

const model = defineModel({
  type: Array as PropType<string[]>,
  default: () => [],
})

const isDragOver = ref(false)

function checkFileType(file: File): boolean {
  const validTypes = props.accept.split(',').map(type => type.trim())
  return validTypes.some((type) => {
    if (type.endsWith('/*')) {
      const prefix = type.slice(0, -1)
      return file.type.startsWith(prefix)
    }
    return file.type === type
  })
}

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const fileList = Array.from(input.files).filter(file => checkFileType(file))
    const stringifiedFiles = await Promise.all(
      fileList.map(file => fileToBase64(file)),
    )
    model.value.push(...stringifiedFiles)
  }
  else {
    model.value = []
  }
}
</script>

<template>
  <div
    class="file-upload"
    :class="{
      'file-upload--has-files': model.length > 0,
      'file-upload--error': error,
    }"
  >
    <div class="file-upload__content">
      <TransitionGroup

        name="list"
        tag="ul"
        class="file-upload__list"
      >
        <li
          v-for="(file, index) in model"
          :key="index"
          class="file-upload__item"
          @auxclick="model.splice(index, 1)"
        >
          <img :src="file" alt="">
          <button
            type="button"
            class="file-upload__remove-button"
            @click="model.splice(index, 1)"
          >
            <IconDelete class="size-4" />
          </button>
        </li>

        <div
          class="file-upload__area"
          :class="{ 'file-upload__area--hover': isDragOver }"
          @dragover="isDragOver = true"
          @dragleave="isDragOver = false"
          @drop="isDragOver = false"
        >
          <input
            type="file"
            :accept="accept"
            multiple
            class="file-upload__input"
            @change="onFileChange"
          >

          <IconMediaUpload
            v-show="model.length === 0"
            class="file-upload__icon w-[60px] h-[48px]"
          />
          <IconPlus
            v-show="model.length > 0"
            class="file-upload__icon size-[30px]"
          />
        </div>
      </TransitionGroup>
    </div>

    <div v-if="error" class="file-upload__error">
      <span class="file-upload__error-text">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-upload {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-upload__content {
  display: flex;
  gap: 8px;
}

.file-upload__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-upload__area {
  position: relative;
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--color-gray-light);
  border-radius: 3px;
  color: var(--color-gray-light);

  &:hover,
  &--hover {
    border-color: var(--color-black);
    color: var(--color-black);
  }
}

.file-upload__input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-upload__item {
  width: 120px;
  height: fit-content;
  min-height: 32px;
  border-radius: 3px;
  outline: 1px solid var(--color-outline);
  outline-offset: -1px;
  position: relative;
}

.file-upload__remove-button {
  position: absolute;
  bottom: 4px;
  right: 4px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--color-gray-light);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.file-upload--has-files {
  .file-upload__area {
    width: 120px;
    height: 120px;
  }
}

.file-upload__error-text {
  color: var(--color-red);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 300ms ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
