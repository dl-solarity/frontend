<template>
  <div class="input-field" :class="inputClasses">
    <label v-if="label" class="input-field__label" :for="`input-field--${uid}`">
      {{ label }}
    </label>
    <div class="input-field__input-wrp">
      <div
        v-if="$slots.nodeLeft"
        ref="nodeLeftWrp"
        class="input-field__node-left-wrp"
      >
        <slot name="nodeLeft" />
      </div>
      <input
        ref="inputEl"
        class="input-field__input"
        :id="`input-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="placeholder"
        :tabindex="tabIndex"
        :type="inputType"
        :min="min"
        :max="max"
        :disabled="isDisabled || isReadonly"
      />
      <div
        v-if="hasRightNode"
        ref="nodeRightWrp"
        class="input-field__node-right-wrp"
      >
        <slot v-if="$slots.nodeRight" name="nodeRight" />
        <button
          v-else-if="isPasswordType"
          type="button"
          @click="isPasswordShown = !isPasswordShown"
        >
          <icon
            class="input-field__icon"
            :name="isPasswordShown ? $icons.eye : $icons.eyeOff"
          />
        </button>
        <button
          v-else-if="isClearable"
          class="input-field__clear-btn"
          type="button"
          @click="clear"
        >
          <icon class="input-field__icon" :name="$icons.x" />
        </button>
        <icon
          v-else-if="props.errorMessage"
          class="input-field__icon input-field__icon--error"
          :name="$icons.exclamationCircle"
        />
      </div>
    </div>
    <transition
      name="input-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="input-field__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="input-field__note-msg">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '#components'
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, ref, useAttrs, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    scheme?: 'primary'
    modelValue: string | number
    label?: string
    placeholder?: string
    type?: 'text' | 'number' | 'password'
    errorMessage?: string
    note?: string
    isClearable?: boolean
  }>(),
  {
    scheme: 'primary',
    type: 'text',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
    isClearable: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
  (e: 'clear'): void
}>()

const attrs = useAttrs()

const slots = useSlots()

const uid = uuidv4()

const inputEl = ref<HTMLInputElement>()
const nodeLeftWrp = ref<HTMLDivElement>()
const nodeRightWrp = ref<HTMLDivElement>()

const isPasswordShown = ref(false)

const isNumberType = computed(() => props.type === 'number')
const isPasswordType = computed(() => props.type === 'password')

const hasRightNode = computed<boolean>(() =>
  Boolean(
    slots.nodeRight ||
      isPasswordType.value ||
      props.isClearable ||
      props.errorMessage,
  ),
)

const min = computed((): string =>
  !isNaN(Number(attrs?.min)) && attrs?.min !== '' ? (attrs.min as string) : '',
)
const max = computed((): string =>
  !isNaN(Number(attrs?.max)) && attrs?.max !== '' ? (attrs.max as string) : '',
)

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const tabIndex = computed(() =>
  isDisabled.value || isReadonly.value ? -1 : Number(attrs.tabindex),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLInputElement

    if (isNumberType.value) {
      eventTarget.value = normalizeNumber(eventTarget.value)
    }
    if (props.modelValue === eventTarget.value) return

    emit('update:modelValue', eventTarget.value)
  },
}))

const inputClasses = computed(() =>
  [
    ...(slots.nodeLeft ? ['input-field--node-left'] : []),
    ...(hasRightNode.value ? ['input-field--node-right'] : []),
    ...(isDisabled.value ? ['input-field--disabled'] : []),
    ...(isReadonly.value ? ['input-field--readonly'] : []),
    ...(props.errorMessage ? ['input-field--error'] : []),
    ...(props.modelValue ? ['input-field--filled'] : []),
    `input-field--${props.scheme}`,
  ].join(' '),
)

const inputType = computed(() => {
  if (isPasswordType.value) {
    return isPasswordShown.value ? 'text' : 'password'
  }
  return 'text'
})

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const OFFSET_WIDTH = 19
onMounted(() => {
  if (!inputEl.value) return

  if (slots?.nodeLeft && nodeLeftWrp.value) {
    inputEl.value?.style.setProperty(
      'padding-left',
      `calc(${
        nodeLeftWrp.value?.offsetWidth || OFFSET_WIDTH
      }px + var(--field-padding-left) * 2)`,
    )
  }

  if (slots?.nodeRight && nodeRightWrp.value) {
    inputEl.value?.style.setProperty(
      'padding-right',
      `calc(${
        nodeRightWrp.value?.offsetWidth || 0
      }px + var(--field-padding-right) * 2)`,
    )
  }
})

const normalizeNumber = (value: string) => {
  return isNaN(Number(value)) ? String(props.modelValue) : value
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

.input-field {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}

.input-field__label {
  @include field-label;

  .input-field--error .input-field__input:not(:focus):placeholder-shown ~ & {
    color: var(--field-error);
  }

  /* stylelint-disable-next-line */
  .input-field__input:not([disabled]):focus ~ & {
    color: var(--field-label-focus);
    font-weight: 700;
  }

  .input-field__input:not(:focus):placeholder-shown:-webkit-autofill ~ & {
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;

    .input-field--node-left & {
      left: calc(var(--field-padding-left) * 3);
    }
  }
}

.input-field__input-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.input-field__input {
  .input-field--node-left & {
    padding-left: calc(var(--field-padding-left) * 3);
  }

  .input-field--node-right & {
    padding-right: calc(var(--field-padding-right) * 3);
  }

  .input-field--error.input-field--primary & {
    border-color: var(--field-error);
  }

  &:not([disabled]):focus {
    .input-field--primary & {
      box-sizing: border-box;
      border-color: var(--field-border-focus);
    }
  }

  &:not([disabled]):not(:focus):hover {
    .input-field--primary:not(.input-field--error) & {
      border-color: var(--field-border-hover);
    }
  }
}

.input-field__node-left-wrp {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: var(--field-padding-left);
  transform: translateY(-50%);
  color: inherit;
  max-height: 100%;
  z-index: $z-index-side-nodes;
}

.input-field__node-right-wrp {
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  color: inherit;
  z-index: $z-index-side-nodes;
}

.input-field__clear-btn {
  display: block;

  &:not([disabled]):hover {
    .input-field__icon:not(.input-field__icon--error) {
      color: var(--primary-main);
    }
  }
}

.input-field__icon {
  max-width: toRem(24);
  max-height: toRem(24);
  color: var(--field-placeholder);
  transition: color var(--field-transition-duration);

  .input-field--filled &:not(.input-field__icon--error) {
    color: var(--field-text);
  }

  &--error {
    color: var(--field-error);
  }
}

.input-field__err-msg,
.input-field__note-msg {
  @include field-error;
}

.input-field__note-msg {
  color: var(--text-primary-light);
}

.input-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.input-field__err-msg-transition-leave-active {
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
