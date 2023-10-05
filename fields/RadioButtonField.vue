<template>
  <div class="radio-button-field">
    <label
      v-for="option of options"
      :key="option.value"
      class="radio-button-field__option"
      :class="{
        'radio-button-field__option--checked': option.value === modelValue,
      }"
    >
      <input
        class="radio-button-field__input"
        v-bind="$attrs"
        type="radio"
        :checked="modelValue === option.value"
        :name="`radio-button-field--${uid}`"
        :value="option.value"
        @change="emit('update:model-value', option.value)"
      />
      <span class="radio-button-field__label">{{ option.title }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { type FieldOption } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const uid = uuidv4()

defineProps<{
  modelValue: FieldOption['value']
  options: FieldOption[]
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption['value']): void
}>()
</script>

<style lang="scss" scoped>
.radio-button-field {
  display: flex;
  gap: toRem(4);
  flex-wrap: wrap;
  padding: toRem(4);
  background: var(--background-primary-dark);
  border-radius: var(--border-radius-main);
  min-width: max-content;
}

.radio-button-field__option {
  cursor: pointer;
  user-select: none;
  border-radius: inherit;
  flex: 1;
  min-width: toRem(120);

  .radio-button-field[disabled] & {
    cursor: not-allowed;
  }
}

.radio-button-field__input {
  position: absolute;
  width: toRem(1);
  height: toRem(1);
  margin: toRem(1);
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.radio-button-field__label {
  display: block;
  padding: toRem(8) toRem(16);
  transition: var(--field-transition-duration) ease;
  transition-property: background-color, color;
  border-radius: inherit;
  color: var(--text-primary-main);
  font-family: var(--field-text-font-family);
  font-size: var(--field-text-font-size);
  font-weight: var(--field-text-font-weight);
  line-height: var(--field-text-line-height);
  letter-spacing: var(--field-text-letter-spacing);
  text-align: center;

  .radio-button-field__option--checked & {
    background: var(--background-primary-light);
    color: var(--primary-main);
  }

  .radio-button-field[disabled] & {
    color: var(--disable-primary-main);
  }

  .radio-button-field:not([disabled]) .radio-button-field__option:focus &,
  .radio-button-field:not([disabled]) .radio-button-field__option:active & {
    background: var(--background-primary-light);
    color: var(--primary-main);
  }

  .radio-button-field__option:not(:focus):not(:active):hover & {
    .radio-button-field:not([disabled]) & {
      background: var(--background-primary-light);
    }
  }
}
</style>
