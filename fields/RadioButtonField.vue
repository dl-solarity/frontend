<template>
  <div
    class="radio-button-field"
    :class="{ 'radio-button-field--disabled': disabled }"
  >
    <label
      v-for="option of options"
      :key="option.id"
      :for="`${uuid}-${option.id}`"
      class="radio-button-field__label"
    >
      <input
        class="radio-button-field__input"
        type="radio"
        :checked="modelValue?.id === option.id"
        :id="`${uuid}-${option.id}`"
        :value="option.title"
        :disabled="disabled"
        @change="emit('update:model-value', option)"
      />
      <span class="radio-button-field__checkmark" />
      <span class="radio-button-field__label-text">{{ option.title }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { type FieldOption } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const uuid = uuidv4()

withDefaults(
  defineProps<{
    modelValue: FieldOption | null
    options: FieldOption[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption): void
}>()
</script>

<style scoped lang="scss">
$checkmark-size: toRem(18);

.radio-button-field {
  display: flex;
  gap: toRem(24);
}

.radio-button-field__label {
  display: flex;
  gap: toRem(12);
  cursor: pointer;
  user-select: none;

  .radio-button-field--disabled & {
    cursor: not-allowed;
    filter: grayscale(50);
    opacity: 0.5;
  }
}

.radio-button-field__input {
  position: absolute;
  width: toRem(1);
  height: toRem(1);
  margin: calc(#{toRem(1)} * -1);
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.radio-button-field__checkmark {
  position: relative;
  height: $checkmark-size;
  width: $checkmark-size;
  border: toRem(2) solid var(--primary-main);
  background-color: transparent;
  border-radius: 50%;
}

.radio-button-field__checkmark:after {
  content: '';
  position: absolute;
  inset: toRem(2);
  border-radius: 50%;
  background: var(--primary-main);
  display: none;

  .radio-button-field__input:checked ~ & {
    display: block;
  }
}

.radio-button-field__label-text {
  @include field-text;
}
</style>
