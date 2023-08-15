<template>
  <div :class="selectFieldClasses">
    <div ref="selectElement" class="select-field__select-wrp">
      <label
        v-if="label"
        class="select-field__label"
        :for="`select-field--${uid}`"
      >
        {{ label }}
      </label>
      <div class="select-field__select-head-wrp">
        <button
          type="button"
          class="select-field__select-head"
          :id="`select-field--${uid}`"
          @blur="emit('blur')"
          @click="toggleDropMenu"
        >
          <template v-if="$slots.head && !!modelValue">
            <slot
              name="head"
              :select-field="{
                select,
                isOpen: isDropMenuOpen,
                close: closeDropMenu,
                open: openDropMenu,
                toggle: toggleDropMenu,
              }"
            />
          </template>
          <template v-else>
            <template v-if="modelValue">
              {{ valueOptions[fieldIndex].title }}
            </template>
            <template v-else-if="placeholder">
              <span class="select-field__placeholder">
                {{ props.placeholder }}
              </span>
            </template>
          </template>
          <icon
            class="select-field__select-head-indicator"
            :name="$icons.arrowDropDown"
          />
        </button>
        <transition name="select-field__select-dropdown">
          <div v-if="isDropMenuOpen" class="select-field__select-drop-menu">
            <template v-if="$slots.default">
              <slot
                :select-field="{
                  select,
                  isOpen: isDropMenuOpen,
                  close: closeDropMenu,
                  open: openDropMenu,
                  toggle: toggleDropMenu,
                }"
              />
            </template>
            <template v-else-if="valueOptions?.length">
              <button
                :class="[
                  'select-field__select-dropdown-item',
                  {
                    'select-field__select-dropdown-item--active':
                      modelValue === option.value,
                  },
                ]"
                type="button"
                v-for="(option, idx) in valueOptions"
                :key="`[${idx}] ${option}`"
                @click="select(option.value)"
              >
                {{ option.title }}
              </button>
            </template>
          </div>
        </transition>
      </div>
    </div>
    <transition
      name="select-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="select-field__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="select-field__note">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '#components'
import { FieldOption } from '@/types'
import { onClickOutside } from '@vueuse/core'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    valueOptions?: FieldOption[]
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
    scheme?: 'primary'
    modification?: 'dropdown' | 'dropup'
  }>(),
  {
    valueOptions: () => [],
    type: 'text',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
    scheme: 'primary',
    modification: 'dropdown',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
  (e: 'blur'): void
}>()

const attrs = useAttrs()

const selectElement = ref<HTMLDivElement | null>(null)

const isDropMenuOpen = ref(false)
const fieldIndex = computed(() =>
  props.valueOptions.findIndex(item => item.value === props.modelValue),
)
const uid = uuidv4()

onBeforeRouteUpdate(() => {
  closeDropMenu()
})

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const isLabelActive = computed(() => isDropMenuOpen.value || !!props.modelValue)

const selectFieldClasses = computed(() => ({
  'select-field': true,
  'select-field--error': props.errorMessage,
  'select-field--filled': props.modelValue,
  'select-field--open': isDropMenuOpen.value,
  'select-field--disabled': isDisabled.value,
  'select-field--readonly': isReadonly.value,
  'select-field--label-active': isLabelActive.value,
  [`select-field--${props.scheme}`]: true,
  [`select-field--${props.modification}`]: true,
}))

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}

const toggleDropMenu = () => {
  isDropMenuOpen.value ? closeDropMenu() : openDropMenu()
}

const openDropMenu = () => {
  if (isDisabled.value || isReadonly.value) return

  isDropMenuOpen.value = true
}

const closeDropMenu = () => {
  isDropMenuOpen.value = false
}

const select = (value: string | number) => {
  if (isDisabled.value || isReadonly.value) return

  emit('update:modelValue', value)
  closeDropMenu()
}

onMounted(() => {
  if (selectElement.value) {
    onClickOutside(selectElement, () => {
      closeDropMenu()
    })
  }
})

watch(
  () => props.modelValue,
  () => {
    closeDropMenu()
  },
)
</script>

<style lang="scss" scoped>
$z-local-index: 2;

.select-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled,
  &--readonly {
    pointer-events: none;

    .select-field__placeholder {
      @include field-placeholder-readonly;
    }
  }
}

.select-field__label {
  @include field-label;
}

.select-field__select-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.select-field__select-head-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.select-field__select-head {
  background: var(--field-bg-primary);
  padding: var(--field-padding);
  padding-right: calc(var(--field-padding-right) + #{toRem(24)});
  text-align: left;
  width: 100%;
  height: 100%;

  $field-text-height: calc(
    var(--field-text-font-size) * var(--field-text-line-height)
  );

  min-height: calc(
    $field-text-height + var(--field-padding-top) + var(--field-padding-bottom)
  );

  @include field-text;

  transition-property: all;

  & + .select-field__focus-indicator {
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

      .select-field--error & {
        background: var(--field-error);
      }
    }
  }

  .select-field--primary & {
    @include field-border;
  }

  .select-field--primary:not(.select-field--open):not(.select-field--error) & {
    &:not([disabled]):hover {
      border-color: var(--field-border-hover);
    }
  }

  .select-field--error.select-field--primary & {
    border-color: var(--field-error);
  }

  .select-field--open.select-field--primary & {
    border-color: var(--field-border-focus);
  }
}

.select-field__placeholder {
  @include field-placeholder;
}

.select-field__select-head-indicator {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  width: toRem(22);
  height: toRem(22);
  color: var(--field-placeholder);
  transition: var(--field-transition-duration) ease-in-out;

  .select-field--disabled &,
  .select-field--readonly & {
    color: var(--disable-primary-main);
  }

  .select-field--filled & {
    color: var(--field-text);
  }

  .select-field--dropup:not(.select-field--open) &,
  .select-field--dropdown.select-field--open & {
    transform: translateY(-50%) rotate(180deg);
  }
}

.select-field__select-drop-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: hidden auto;
  right: 0;
  width: 100%;
  max-height: 500%;
  z-index: $z-local-index;
  background: var(--white);
  box-shadow: 0 toRem(1) toRem(2) rgba(var(--black-rgb), 0.3),
    0 toRem(2) toRem(6) toRem(2) rgba(var(--black-rgb), 0.15);
  border-radius: toRem(14);

  .select-field--dropdown & {
    top: 110%;
  }

  .select-field--dropup & {
    bottom: 110%;
  }
}

.select-field__select-dropdown-enter-active {
  animation: dropdown var(--field-transition-duration);
}

.select-field__select-dropdown-leave-active {
  animation: dropdown var(--field-transition-duration) 0.1s reverse;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(20%);
    max-height: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500%;
  }
}

.select-field__select-dropdown-item {
  @include field-text;

  text-align: left;
  width: 100%;
  padding: var(--field-padding);
  background: var(--field-bg-primary);

  &:not([disabled]):not(.select-field__select-dropdown-item--active):hover {
    background: var(--background-primary-main);
  }

  &--active {
    background: var(--primary-main);
    color: var(--text-primary-invert-main);
  }
}

.select-field__err-msg,
.select-field__note {
  @include field-error;
}

.select-field__note {
  color: var(--text-primary-light);
}

.select-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.select-field__err-msg-transition-leave-active {
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
