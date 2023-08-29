<template>
  <div ref="autocompleteFieldElement" :class="autocompleteFieldClasses">
    <label
      v-if="label"
      class="autocomplete-field__label"
      :for="`autocomplete-field--${uid}`"
    >
      {{ label }}
    </label>
    <div class="autocomplete-field__wrp">
      <div class="autocomplete-field__input-wrp">
        <input
          class="autocomplete-field__input"
          v-bind="$attrs"
          :value="filterTitle ?? modelTitle"
          :placeholder="placeholder"
          v-on="inputListeners"
        />
        <app-icon
          class="autocomplete-field__indicator"
          :name="$icons.arrowDropDown"
        />
      </div>
      <drop-menu
        v-model:is-open="isDropMenuOpen"
        :model-value="modelValue"
        :options="options"
        @update:model-value="emit('update:model-value', $event)"
      />
    </div>
    <transition
      name="autocomplete-field__err-msg"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="autocomplete-field__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="autocomplete-field__note">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { AppIcon, DropMenu } from '#components'
import { FieldOption } from '@/types'
import { onClickOutside } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref, useAttrs, watch } from 'vue'

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption['value']): void
}>()

const props = withDefaults(
  defineProps<{
    modelValue: string
    options: FieldOption[]
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
  }>(),
  {
    label: '',
    placeholder: '',
    errorMessage: '',
    note: '',
  },
)

const uid = uuidv4()

const attrs = useAttrs()

const autocompleteFieldElement = ref<HTMLDivElement | null>(null)
const isDropMenuOpen = ref(false)
const filterTitle = ref<string | undefined>(undefined)

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const autocompleteFieldClasses = computed(() => ({
  'autocomplete-field': true,
  'autocomplete-field--open': isDropMenuOpen.value,
  'autocomplete-field--filled': props.modelValue,
  'autocomplete-field--disabled': isDisabled.value,
  'autocomplete-field--readonly': isReadonly.value,
  'autocomplete-field--error': props.errorMessage,
}))

const inputListeners = computed(() => ({
  focus() {
    if (!isDisabled.value && !isReadonly.value) {
      isDropMenuOpen.value = true
    }
  },
  input(event: Event) {
    filterTitle.value = (event.target as HTMLInputElement).value
  },
}))

const options = computed<typeof props.options>(() =>
  typeof filterTitle.value === 'string'
    ? props.options.filter(option =>
        option.title.startsWith(filterTitle.value as string),
      )
    : props.options,
)

const modelTitle = computed<string>(
  () =>
    props.options.find(option => option.value === props.modelValue)?.title ||
    '',
)

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}

watch(
  [() => props.modelValue, isDropMenuOpen],
  () => (filterTitle.value = undefined),
)

onMounted(() => {
  if (autocompleteFieldElement.value)
    onClickOutside(autocompleteFieldElement, () => {
      isDropMenuOpen.value = false
    })
})
</script>

<style lang="scss" scoped>
.autocomplete-field {
  display: flex;
  flex-direction: column;
}

.autocomplete-field__label {
  @include field-label;
}

.autocomplete-field__wrp,
.autocomplete-field__input-wrp {
  position: relative;
}

.autocomplete-field__indicator {
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  width: toRem(22);
  height: toRem(22);
  color: var(--field-placeholder);
  transition: var(--field-transition-duration) ease-in-out;

  .autocomplete-field--disabled &,
  .autocomplete-field--readonly & {
    color: var(--disable-primary-main);
  }

  .autocomplete-field--filled & {
    color: var(--field-text);
  }

  .autocomplete-field--open & {
    transform: translateY(-50%) rotate(180deg);
  }
}
.autocomplete-field__input {
  width: 100%;

  .autocomplete-field--error & {
    border-color: var(--field-error);
  }

  &:not([disabled]):focus {
    border-color: var(--field-border-focus);
  }

  &:not([disabled]):not(:focus):hover {
    .autocomplete-field:not(.autocomplete-field--error) & {
      border-color: var(--field-border-hover);
    }
  }
}

.autocomplete-field__err-msg,
.autocomplete-field__note {
  @include field-error;
}

.autocomplete-field__note {
  color: var(--text-primary-main);
}

.autocomplete-field__err-msg {
  &-enter-active {
    animation: fade-down var(--field-transition-duration);
  }

  &-leave-active {
    animation: fade-down var(--field-transition-duration) reverse;
  }
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
