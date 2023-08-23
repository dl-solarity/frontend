<template>
  <div :class="textareaClasses">
    <label
      v-if="label"
      :for="`textarea-field--${uid}`"
      class="textarea-field__label"
    >
      {{ label }}
    </label>
    <div class="textarea-field__textarea-wrp">
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
      <div
        v-if="hasRightNode"
        ref="nodeRightWrp"
        class="textarea-field__node-right-wrp"
      >
        <slot v-if="$slots.nodeRight" name="nodeRight" />
        <button
          v-else-if="isClearable"
          class="textarea-field__clear-btn"
          type="button"
          @click="clear"
        >
          <icon class="textarea-field__icon" :name="$icons.x" />
        </button>
        <icon
          v-else-if="props.errorMessage"
          class="textarea-field__icon textarea-field__icon--error"
          :name="$icons.exclamationCircle"
        />
      </div>
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
import { Icon } from '#components'
import { v4 as uuidv4 } from 'uuid'
import { computed, useAttrs, useSlots } from 'vue'

type SCHEMES = 'primary'

const props = withDefaults(
  defineProps<{
    scheme?: SCHEMES
    modelValue: string | number
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
    isClearable?: boolean
  }>(),
  {
    scheme: 'primary',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
    isClearable: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
  (e: 'clear'): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const uid = uuidv4()

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const hasRightNode = computed<boolean>(() =>
  Boolean(slots.nodeRight || props.isClearable || props.errorMessage),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement

    if (props.modelValue === eventTarget.value) return

    emit('update:modelValue', eventTarget.value)
  },
}))

const textareaClasses = computed(() =>
  [
    'textarea-field',
    ...(hasRightNode.value ? ['textarea-field--node-right'] : []),
    ...(isDisabled.value ? ['textarea-field--disabled'] : []),
    ...(isReadonly.value ? ['textarea-field--readonly'] : []),
    ...(props.errorMessage ? ['textarea-field--error'] : []),
    ...(props.modelValue ? ['textarea-field--filled'] : []),
    `textarea-field--${props.scheme}`,
  ].join(' '),
)

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
$z-index-side-nodes: 1;

.textarea-field {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
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
  resize: none;
  min-height: toRem(130);

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

  .textarea-field--node-right & {
    padding-right: calc(var(--field-padding-right) * 3);
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

.textarea-field__node-right-wrp {
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  color: inherit;
  z-index: $z-index-side-nodes;
}

.textarea-field__clear-btn {
  display: block;

  &:not([disabled]):hover {
    .textarea-field__icon:not(.textarea-field__icon--error) {
      color: var(--primary-main);
    }
  }
}

.textarea-field__icon {
  max-width: toRem(24);
  max-height: toRem(24);
  color: var(--field-placeholder);
  transition: color var(--field-transition-duration);

  .textarea-field--filled &:not(.textarea-field__icon--error) {
    color: var(--field-text);
  }

  &--error {
    color: var(--field-error);
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
