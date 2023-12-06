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
        ref="textareaElement"
        class="textarea-field__textarea"
        :id="`textarea-field--${uid}`"
        spellcheck="false"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="placeholder"
        :tabindex="tabIndex"
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
          <app-icon class="textarea-field__icon" :name="$icons.x" />
        </button>
        <app-icon
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
import { AppIcon } from '#components'
import { v4 as uuidv4 } from 'uuid'
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue'

type SCHEMES = 'primary'
type SIZES = 'default' | 'small'

const props = withDefaults(
  defineProps<{
    modelValue: string
    scheme?: SCHEMES
    size?: SIZES
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
    isClearable?: boolean
  }>(),
  {
    scheme: 'primary',
    size: 'default',
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
const textareaElement = ref<HTMLTextAreaElement | null>(null)
const nodeRightWrp = ref<HTMLDivElement | null>(null)

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const tabIndex = computed<number>(() =>
  isDisabled.value || isReadonly.value ? -1 : Number(attrs.tabindex),
)

const hasRightNode = computed<boolean>(() =>
  Boolean(slots.nodeRight || props.isClearable || props.errorMessage),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement
    emit('update:modelValue', eventTarget.value)
  },
}))

const textareaClasses = computed(() => [
  'textarea-field',
  ...(hasRightNode.value ? ['textarea-field--node-right'] : []),
  ...(isDisabled.value ? ['textarea-field--disabled'] : []),
  ...(isReadonly.value ? ['textarea-field--readonly'] : []),
  ...(props.errorMessage ? ['textarea-field--error'] : []),
  ...(props.modelValue ? ['textarea-field--filled'] : []),
  `textarea-field--size-${props.size}`,
  `textarea-field--${props.scheme}`,
])

const resizeTextarea = () => {
  if (!textareaElement.value) throw new Error('textareaElement unavailable')

  const offset =
    textareaElement.value.offsetHeight - textareaElement.value.clientHeight

  textareaElement.value.style.height = '1px'
  textareaElement.value.style.height = `${
    textareaElement.value.scrollHeight + offset
  }px`
}

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

watch(
  () => props.modelValue,
  () => nextTick(resizeTextarea),
)

onMounted(resizeTextarea)

const OFFSET_WIDTH = 19
onMounted(() => {
  if (!textareaElement.value) return

  if (slots?.nodeRight && nodeRightWrp.value) {
    textareaElement.value?.style.setProperty(
      'padding-right',
      `calc(${
        nodeRightWrp.value?.offsetWidth || OFFSET_WIDTH
      }px + var(--field-padding-right) * 2)`,
    )
  }
})
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
  height: 0;
  width: 100%;

  .textarea-field--size-default & {
    min-height: toRem(130);
    max-height: toRem(390);
  }

  .textarea-field--size-small & {
    min-height: toRem(48);
    max-height: toRem(144);
  }

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
      transition: width calc(var(--transition-duration-fast) + 0.3s);

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
  display: flex;
  gap: toRem(8);
}

.textarea-field__icon {
  max-width: toRem(24);
  max-height: toRem(24);
  color: var(--field-placeholder);
  transition: color var(--transition-duration-fast)
    var(--transition-timing-default);

  .textarea-field--filled &:not(.textarea-field__icon--error) {
    color: var(--field-text);
  }

  &--error {
    color: var(--field-error);
  }
}

.textarea-field__clear-btn {
  display: block;

  &:not([disabled]):hover {
    .textarea-field__icon:not(.textarea-field__icon--error) {
      color: var(--primary-main);
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
  animation: fade-down var(--transition-duration-fast)
    var(--transition-timing-default);
}

.textarea-field__err-msg-transition-leave-active {
  animation: fade-down var(--transition-duration-fast)
    var(--transition-timing-default) reverse;
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
