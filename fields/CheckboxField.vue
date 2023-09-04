<template>
  <label
    class="checkbox-field"
    :class="{ 'checkbox-field--checked': modelValue }"
  >
    <input
      v-bind="$attrs"
      class="checkbox-field__input"
      type="checkbox"
      :checked="modelValue"
      :name="$attrs.name as string || label"
      :value="value"
      @change="onChange"
    />
    <span class="checkbox-field__label">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    value?: string | number
  }>(),
  {
    label: '',
    value: '',
  },
)

const onChange = (event: Event) => {
  emit('update:model-value', (event.target as HTMLInputElement).checked)
}
</script>

<style lang="scss" scoped>
.checkbox-field {
  display: block;
  cursor: pointer;
  user-select: none;
  max-width: max-content;
  padding: toRem(4);
  border-radius: var(--border-radius-main);
  background: var(--background-primary-dark);

  &[disabled] {
    cursor: not-allowed;
  }
}

.checkbox-field__input {
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

.checkbox-field__label {
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
  min-width: max-content;

  .checkbox-field--checked &,
  .checkbox-field:not([disabled]):focus &,
  .checkbox-field:not([disabled]):active & {
    background: var(--background-primary-light);
    color: var(--primary-main);
  }

  .checkbox-field[disabled] & {
    color: var(--disable-primary-main);
  }

  .checkbox-field:not([disabled]):not(:focus):not(:active):hover & {
    background: var(--background-primary-light);
  }
}
</style>
