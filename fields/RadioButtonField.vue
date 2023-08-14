<template>
  <div
    class="radio-button-field"
    :class="{ 'radio-button-field--disabled': isDisabled }"
  >
    <label
      v-for="option of options"
      :key="option.value"
      :for="`${uuid}-${option.value}`"
      class="radio-button-field__label"
    >
      <input
        class="radio-button-field__input"
        v-bind="$attrs"
        type="radio"
        :checked="modelValue === option.value"
        :id="`${uuid}-${option.value}`"
        :name="uuid"
        :value="option.value"
        :disabled="isDisabled"
        @change="emit('update:model-value', option.value)"
      />
      <span class="radio-button-field__checkmark" />
      <span class="radio-button-field__label-text">{{ option.title }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { type FieldOption } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()
const uuid = uuidv4()

defineProps<{
  modelValue: FieldOption['value']
  options: FieldOption[]
}>()

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption['value']): void
}>()

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)
</script>

<style scoped lang="scss">
$checkmark-size: toRem(18);

.radio-button-field {
  display: flex;
  gap: toRem(24);
  flex-wrap: wrap;
  min-height: toRem(22);
  padding-left: toRem(2);
}

.radio-button-field__label {
  display: flex;
  align-items: center;
  gap: toRem(8);
  cursor: pointer;
  user-select: none;

  .radio-button-field--disabled & {
    cursor: not-allowed;

    .radio-button-field__label-text {
      color: var(--disable-primary-main);
    }

    .radio-button-field__checkmark {
      border-color: var(--disable-primary-main);

      &:after {
        background: var(--disable-primary-main);
      }
    }
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

.radio-button-field__checkmark {
  position: relative;
  flex-shrink: 0;
  height: $checkmark-size;
  width: $checkmark-size;
  border: toRem(2) solid var(--text-primary-light);
  background-color: transparent;
  border-radius: 50%;
  transition: border var(--field-transition-duration);

  .radio-button-field__input:not([disabled]):not(:checked):hover ~ & {
    border-color: var(--text-primary-main);
  }

  .radio-button-field__input:not([disabled]):checked ~ & {
    border-color: var(--primary-main);
  }

  .radio-button-field__input:not([disabled]):checked:hover ~ & {
    border-color: var(--primary-light);

    &:after {
      background: var(--primary-light);
    }
  }
}

.radio-button-field__checkmark:after {
  content: '';
  position: absolute;
  inset: toRem(2);
  border-radius: 50%;
  background: var(--primary-main);
  opacity: 0;
  transition: var(--field-transition-duration);
  transition-property: background-color, opacity;

  .radio-button-field__input:checked ~ & {
    opacity: 1;
  }
}

.radio-button-field__label-text {
  @include field-text;
}
</style>
