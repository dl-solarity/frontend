<template>
  <div :class="textareaClasses">
    <div class="textarea-field__textarea-wrp">
      <label
        v-if="label"
        :for="`textarea-field--${uid}`"
        class="textarea-field__label"
      >
        {{ label }}
      </label>
      <textarea
        class="textarea-field__textarea"
        :id="`textarea-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="placeholder"
        :tabindex="isDisabled || isReadonly ? -1 : ($attrs.tabindex as number)"
        :disabled="isDisabled || isReadonly"
      />
    </div>
    <transition
      name="textarea-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="textarea-field__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="textarea-field__note">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type SCHEMES = 'primary'

const props = withDefaults(
  defineProps<{
    scheme?: SCHEMES
    modelValue: string | number
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
  }>(),
  {
    scheme: 'primary',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
  },
)

const emit = defineEmits<{
  (event: 'update:model-value', value: string | number): void
}>()

const attrs = useAttrs()

const uid = uuidv4()

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement

    if (props.modelValue === eventTarget.value) return

    emit('update:model-value', eventTarget.value)
  },
}))

const textareaClasses = computed(() =>
  [
    'textarea-field',
    ...(isDisabled.value ? ['textarea-field--disabled'] : []),
    ...(isReadonly.value ? ['textarea-field--readonly'] : []),
    ...(props.errorMessage ? ['textarea-field--error'] : []),
    `textarea-field--${props.scheme}`,
  ].join(' '),
)

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
.textarea-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled,
  &--readonly {
    .textarea-field__textarea:disabled,
    .textarea-field__textarea:read-only {
      border-color: var(--disable-primary-dark);
      background: var(--disable-primary-dark);
    }
  }
}

.textarea-field__label {
  @include field-label;
}

.textarea-field__textarea-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.textarea-field__textarea {
  padding: var(--field-padding);
  background: var(--field-bg-primary);
  resize: none;
  min-height: toRem(130);
  box-shadow: inset 0 0 0 toRem(500) var(--field-bg-primary);
  border: none;

  @include field-text;

  & + .textarea-field__focus-indicator {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      bottom: toRem(-2);
      left: 50%;
      transform: translateX(-50%);
      height: toRem(2);
      width: 0;
      background: var(--primary-main);
      transition: width calc(var(--field-transition-duration) + 0.3s);

      .textarea-field--error & {
        background: var(--field-error);
      }
    }
  }

  .textarea-field--primary & {
    @include field-border;
  }

  transition-property: all;

  &:read-only::-webkit-input-placeholder {
    @include field-placeholder-readonly;
  }

  &:read-only::-moz-placeholder {
    @include field-placeholder-readonly;
  }

  &:read-only:-moz-placeholder {
    @include field-placeholder-readonly;
  }

  &:read-only:-ms-input-placeholder {
    @include field-placeholder-readonly;
  }

  &:read-only::placeholder {
    @include field-placeholder-readonly;
  }

  &::-webkit-input-placeholder {
    @include field-placeholder;
  }

  &::-moz-placeholder {
    @include field-placeholder;
  }

  &:-moz-placeholder {
    @include field-placeholder;
  }

  &:-ms-input-placeholder {
    @include field-placeholder;
  }

  &::placeholder {
    @include field-placeholder;
  }

  .textarea-field--error.textarea-field--primary & {
    border-color: var(--field-error);
  }

  &:not([disabled]):focus {
    .textarea-field--primary & {
      box-sizing: border-box;
      border-color: var(--field-border-focus);
    }
  }

  &:not([disabled]):not(:focus):hover {
    .textarea-field--primary:not(.textarea-field--error) & {
      border-color: var(--field-border-hover);
    }
  }
}

.textarea-field__err-msg,
.textarea-field__note {
  @include field-error;
}

.textarea-field__note {
  color: var(--text-primary-light);
}

.textarea-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.textarea-field__err-msg-transition-leave-active {
  animation: fade-down var(--field-transition-duration) reverse;
}

@keyframes fade-down {
  from {
    height: 0;
  }

  to {
    height: var(--field-error-msg-height);
  }
}
</style>
