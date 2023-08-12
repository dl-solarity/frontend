<template>
  <label
    class="checkbox-field"
    :class="{
      'checkbox-field--disabled': disabled,
      'checkbox-field--checked': modelValue,
    }"
  >
    <input
      v-bind="$attrs"
      class="checkbox-field__input"
      type="checkbox"
      :checked="modelValue"
      :name="$attrs.name || label"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />

    <span class="checkbox-field__frame-wrp" aria-hidden="true">
      <span class="checkbox-field__frame">
        <icon class="checkbox-field__frame-icon" :name="$icons.check" />
      </span>
    </span>

    <span class="checkbox-field__label">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
import { Icon } from '#components'

import { defineComponent } from 'vue'

enum EVENTS {
  updateModelValue = 'update:model-value',
}

export default defineComponent({
  name: 'checkbox-field',
  components: { Icon },
  props: {
    modelValue: { type: Boolean, default: false },
    value: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: Object.values(EVENTS),
  setup(props, { emit }) {
    const onChange = (event: Event) => {
      const target = event.target as HTMLInputElement

      emit(EVENTS.updateModelValue, target.checked)
    }

    return {
      onChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.checkbox-field {
  cursor: pointer;
  display: grid;
  align-items: center;
  grid-template-columns: toRem(18) 1fr;
  grid-gap: toRem(8);
  min-height: toRem(22);
  padding-left: toRem(2);
  max-width: max-content;

  &--disabled {
    cursor: not-allowed;

    .checkbox-field__frame-wrp {
      border-color: var(--disable-primary-main);
    }

    .checkbox-field__label {
      color: var(--disable-primary-main);
    }

    &.checkbox-field--checked .checkbox-field__frame-wrp {
      border-color: var(--disable-primary-main);
      background-color: var(--disable-primary-main);
    }
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

.checkbox-field__frame-wrp {
  overflow: hidden;
  width: toRem(18);
  height: toRem(18);
  transition: var(--field-transition-duration);
  transition-property: border-color, background-color;
  border-radius: toRem(3);
  border: toRem(2) solid var(--text-primary-light);

  .checkbox-field--checked & {
    border-color: var(--primary-main);
    background: var(--primary-main);
  }

  .checkbox-field:not(.checkbox-field--disabled):hover & {
    border-color: var(--text-primary-main);
  }

  .checkbox-field--checked:not(.checkbox-field--disabled):hover & {
    border-color: var(--primary-light);
    background: var(--primary-light);
  }
}

.checkbox-field__frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.checkbox-field__frame-icon {
  width: toRem(10);
  height: toRem(10);
  color: var(--background-primary-light);
  transition: opacity var(--field-transition-duration);
  opacity: 0;

  .checkbox-field--checked & {
    opacity: 1;
  }
}

.checkbox-field__label {
  display: flex;
  align-items: center;
  user-select: none;

  @include field-text;
}
</style>
