<template>
  <template v-if="route">
    <nuxt-link
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :to="route"
    >
      <app-icon
        v-if="buttonIconLeft"
        class="app-button__icon-left"
        :name="buttonIconLeft"
      />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <app-icon
        v-if="buttonIconRight"
        class="app-button__icon-right"
        :name="buttonIconRight"
      />
    </nuxt-link>
  </template>
  <template v-else-if="href">
    <a class="app-button" :class="buttonClasses" v-bind="$attrs" :href="href">
      <app-icon
        v-if="buttonIconLeft"
        class="app-button__icon-left"
        :name="buttonIconLeft"
      />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <app-icon
        v-if="buttonIconRight"
        class="app-button__icon-right"
        :name="buttonIconRight"
      />
    </a>
  </template>
  <template v-else>
    <button
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :disabled="isDisabled"
      :type="buttonType"
    >
      <app-icon
        v-if="buttonIconLeft"
        class="app-button__icon-left"
        :name="buttonIconLeft"
      />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <app-icon
        v-if="buttonIconRight"
        class="app-button__icon-right"
        :name="buttonIconRight"
      />
    </button>
  </template>
</template>

<script lang="ts" setup>
import { AppIcon } from '#components'
import { ICON_NAMES } from '@/enums'
import { RouteLocationRaw } from '@/types'
import { computed, useAttrs, useSlots } from 'vue'

type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    text?: string
    scheme?: 'filled' | 'flat' | 'none'
    modification?: 'border-circle' | 'border-rounded' | 'text' | 'none'
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'none'
    size?: 'large' | 'medium' | 'none'
    route?: RouteLocationRaw
    href?: string
    iconLeft?: ICON_NAMES | ''
    iconRight?: ICON_NAMES | ''
    isLoading?: boolean
  }>(),
  {
    text: '',
    scheme: 'filled',
    modification: 'border-rounded',
    color: 'primary',
    size: 'medium',
    route: undefined,
    href: '',
    iconLeft: '',
    iconRight: '',
    isLoading: false,
  },
)

const attrs = useAttrs()
const slots = useSlots()

const isDisabled = computed(
  (): boolean =>
    ['', 'disabled', true].includes(attrs.disabled as string | boolean) ||
    props.isLoading,
)

const buttonClasses = computed(() => [
  'app-button',
  `app-button--scheme-${props.scheme}`,
  ...(props.modification !== 'none'
    ? [`app-button--${props.modification}`]
    : []),
  `app-button--${props.color}`,
  ...(props.size !== 'none' ? [`app-button--${props.size}`] : []),
  ...(isDisabled.value ? ['app-button--disabled'] : []),
  ...((props.iconLeft || props.iconRight) && !props.text && !slots.default
    ? ['app-button--icon-only']
    : []),
  ...(props.isLoading ? ['app-button--loading'] : []),
])

const buttonIconLeft = computed(() =>
  props.isLoading && ((!props.iconLeft && !props.iconRight) || props.iconLeft)
    ? ICON_NAMES.spinner
    : props.iconLeft,
)

const buttonIconRight = computed(() =>
  props.isLoading && !props.iconLeft && props.iconRight
    ? ICON_NAMES.spinner
    : props.iconRight,
)

const buttonType = computed<ButtonType>(
  () => (attrs.type as ButtonType) || 'button',
)
</script>

<style lang="scss" scoped>
.app-button {
  --button-transition-duration: 0.2s;

  display: grid;
  width: max-content;
  grid: auto / auto-flow max-content;
  align-items: center;
  justify-content: center;
  transition: all var(--button-transition-duration)
    var(--transition-timing-default);
  border: var(--app-button-border);
  background-color: var(--app-button-bg);
  color: var(--app-button-text);

  &:disabled:not(.app-button--loading),
  &--disabled:not(.app-button--loading) {
    cursor: not-allowed;
    pointer-events: none;
    --app-button-bg: var(--app-button-disabled-bg);
    --app-button-text: var(--app-button-disabled-text);
    --app-button-border: var(--app-button-disabled-border);
  }

  &.app-button--disabled,
  .app-button--loading {
    background-color: var(--app-button-bg);
    color: var(--app-button-text);
    border: var(--app-button-border);
    opacity: 0.5;
  }

  &:not([disabled]):hover {
    text-decoration: none;
    transition-timing-function: var(--transition-timing-default);
    color: var(--app-button-text-hover);
    background-color: var(--app-button-bg-hover);
    border: var(--app-button-border-hover);
  }

  &:not([disabled]).router-link-active,
  &:not([disabled]):focus {
    text-decoration: none;
    color: var(--app-button-text-focused);
    transition-timing-function: var(--transition-timing-default);
    background-color: var(--app-button-bg-focused);
    border: var(--app-button-border-focused);
  }

  &:not([disabled]):active {
    text-decoration: none;
    transition-timing-function: var(--transition-timing-default);
    color: var(--app-button-text-active);
    background-color: var(--app-button-bg-active);
    border: var(--app-button-border-active);
  }

  &--scheme-filled {
    --app-button-filled-border: 0;
    --app-button-filled-border-hover: 0;
    --app-button-filled-border-active: 0;
    --app-button-filled-border-focused: 0;

    --app-button-bg: var(--app-button-filled-bg);
    --app-button-bg-hover: var(--app-button-filled-bg-hover);
    --app-button-bg-focused: var(--app-button-filled-bg-focused);
    --app-button-bg-active: var(--app-button-filled-bg-active);

    --app-button-text: var(--app-button-filled-text);
    --app-button-text-hover: var(--app-button-filled-text-hover);
    --app-button-text-focused: var(--app-button-filled-text-focused);
    --app-button-text-active: var(--app-button-filled-text-active);

    --app-button-border: var(--app-button-filled-border);
    --app-button-border-hover: var(--app-button-filled-border-hover);
    --app-button-border-active: var(--app-button-filled-border-active);
    --app-button-border-focused: var(--app-button-filled-border-focused);

    --app-button-disabled-text: var(--disable-primary-main);
    --app-button-disabled-bg: var(--disable-primary-dark);
  }

  &--scheme-flat {
    --app-button-flat-bg: none;
    --app-button-flat-bg-hover: none;
    --app-button-flat-bg-focused: none;
    --app-button-flat-bg-active: none;

    --app-button-bg: var(--app-button-flat-bg);
    --app-button-bg-hover: var(--app-button-flat-bg-hover);
    --app-button-bg-focused: var(--app-button-flat-bg-focused);
    --app-button-bg-active: var(--app-button-flat-bg-active);

    --app-button-text: var(--app-button-flat-text);
    --app-button-text-hover: var(--app-button-flat-text-hover);
    --app-button-text-focused: var(--app-button-flat-text-focused);
    --app-button-text-active: var(--app-button-flat-text-active);

    --app-button-border: var(--app-button-flat-border);
    --app-button-border-hover: var(--app-button-flat-border-hover);
    --app-button-border-focused: var(--app-button-flat-border-focused);
    --app-button-border-active: var(--app-button-flat-border-active);

    --app-button-disabled-text: var(--disable-primary-main);
    --app-button-disabled-border: #{toRem(1)} solid var(--disable-primary-main);
  }

  &--scheme-none {
    --app-button-none-bg: transparent;
    --app-button-none-bg-hover: transparent;
    --app-button-none-bg-focused: transparent;
    --app-button-none-bg-active: transparent;

    --app-button-bg: var(--app-button-none-bg);
    --app-button-bg-hover: var(--app-button-none-bg-hover);
    --app-button-bg-focused: var(--app-button-none-bg-focused);
    --app-button-bg-active: var(--app-button-none-bg-active);

    --app-button-text: var(--app-button-none-text);
    --app-button-text-hover: var(--app-button-none-text-hover);
    --app-button-text-focused: var(--app-button-none-text-focused);
    --app-button-text-active: var(--app-button-none-text-active);

    --app-button-disabled-text: var(--disable-primary-main);
  }

  &--primary {
    --app-button-filled-bg: var(--primary-main);
    --app-button-filled-bg-hover: var(--primary-dark);
    --app-button-filled-bg-focused: var(--primary-dark);
    --app-button-filled-bg-active: var(--primary-dark);

    --app-button-filled-text: var(--text-primary-invert-main);
    --app-button-filled-text-hover: var(--text-primary-invert-main);
    --app-button-filled-text-focused: var(--primary-light);
    --app-button-filled-text-active: var(--primary-light);

    --app-button-flat-bg-hover: var(--background-primary-light);
    --app-button-flat-bg-focused: var(--background-primary-light);
    --app-button-flat-bg-active: var(--background-primary-light);

    --app-button-flat-text: var(--primary-main);
    --app-button-flat-text-hover: var(--primary-main);
    --app-button-flat-text-focused: var(--primary-light);
    --app-button-flat-text-active: var(--primary-light);

    --app-button-flat-border: #{toRem(1)} solid var(--primary-main);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--primary-main);
    --app-button-flat-border-focused: #{toRem(1)} solid var(--primary-light);
    --app-button-flat-border-active: #{toRem(1)} solid var(--primary-light);

    --app-button-none-bg-hover: var(--background-primary-light);
    --app-button-none-bg-focused: var(--background-primary-light);
    --app-button-none-bg-active: var(--background-primary-light);

    --app-button-none-text: var(--primary-main);
    --app-button-none-text-hover: var(--primary-main);
    --app-button-none-text-focused: var(--primary-light);
    --app-button-none-text-active: var(--primary-light);

    &.app-button--text {
      --app-button-text: var(--primary-main);
      --app-button-text-hover: var(--primary-light);
      --app-button-text-focused: var(--primary-dark);
      --app-button-text-active: var(--primary-dark);
    }
  }

  &--secondary {
    $flat-border-hover: #{toRem(1)} solid var(--border-primary-light);

    --app-button-flat-bg-hover: var(--background-primary-main);
    --app-button-flat-bg-focused: var(--background-primary-main);
    --app-button-flat-bg-active: var(--background-primary-main);

    --app-button-flat-text: var(--text-primary-light);
    --app-button-flat-text-hover: var(--text-primary-light);
    --app-button-flat-text-focused: var(--primary-main);
    --app-button-flat-text-active: var(--primary-main);

    --app-button-flat-border: #{toRem(1)} solid var(--border-primary-light);
    --app-button-flat-border-hover: #{$flat-border-hover};
    --app-button-flat-border-focused: #{toRem(1)} solid var(--primary-main);
    --app-button-flat-border-active: #{toRem(1)} solid var(--primary-main);

    --app-button-none-bg-hover: var(--background-primary-light);
    --app-button-none-bg-focused: var(--background-primary-light);
    --app-button-none-bg-active: var(--background-primary-light);

    --app-button-none-text: var(--text-primary-main);
    --app-button-none-text-hover: var(--text-primary-main);
    --app-button-none-text-focused: var(--primary-main);
    --app-button-none-text-active: var(--primary-main);

    &.app-button--text {
      --app-button-text: var(--text-primary-main);
      --app-button-text-hover: var(--primary-main);
      --app-button-text-focused: var(--primary-light);
      --app-button-text-active: var(--primary-light);
    }
  }

  &--success {
    --app-button-filled-bg: var(--success-main);
    --app-button-filled-bg-hover: var(--success-dark);
    --app-button-filled-bg-focused: var(--success-dark);
    --app-button-filled-bg-active: var(--success-dark);

    --app-button-filled-text: var(--text-primary-invert-main);
    --app-button-filled-text-hover: var(--text-primary-invert-main);
    --app-button-filled-text-focused: var(--text-primary-invert-light);
    --app-button-filled-text-active: var(--text-primary-invert-main);

    --app-button-flat-bg-hover: var(--background-success-light);
    --app-button-flat-bg-focused: var(--background-success-light);
    --app-button-flat-bg-active: var(--background-success-light);

    --app-button-flat-text: var(--success-main);
    --app-button-flat-text-hover: var(--success-main);
    --app-button-flat-text-focused: var(--success-light);
    --app-button-flat-text-active: var(--success-light);

    --app-button-flat-border: #{toRem(1)} solid var(--success-main);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--success-main);
    --app-button-flat-border-focused: #{toRem(1)} solid var(--success-light);
    --app-button-flat-border-active: #{toRem(1)} solid var(--success-light);

    --app-button-none-bg-hover: var(--background-success-light);
    --app-button-none-bg-focused: var(--background-success-light);
    --app-button-none-bg-active: var(--background-success-light);

    --app-button-none-text: var(--success-main);
    --app-button-none-text-hover: var(--success-main);
    --app-button-none-text-focused: var(--success-light);
    --app-button-none-text-active: var(--success-light);

    &.app-button--text {
      --app-button-text: var(--text-primary-invert-main);
      --app-button-text-hover: var(--primary-light);
      --app-button-text-focused: var(--primary-dark);
      --app-button-text-active: var(--primary-dark);
    }
  }

  &--error {
    --app-button-filled-bg: var(--error-main);
    --app-button-filled-bg-hover: var(--error-dark);
    --app-button-filled-bg-focused: var(--error-dark);
    --app-button-filled-bg-active: var(--error-dark);

    --app-button-filled-text: var(--text-primary-invert-main);
    --app-button-filled-text-hover: var(--text-primary-invert-main);
    --app-button-filled-text-focused: var(--text-primary-invert-light);
    --app-button-filled-text-active: var(--text-primary-invert-main);

    --app-button-flat-bg-hover: var(--background-error-light);
    --app-button-flat-bg-focused: var(--background-error-light);
    --app-button-flat-bg-active: var(--background-error-light);

    --app-button-flat-text: var(--error-main);
    --app-button-flat-text-hover: var(--error-main);
    --app-button-flat-text-focused: var(--error-light);
    --app-button-flat-text-active: var(--error-light);

    --app-button-flat-border: #{toRem(1)} solid var(--error-main);
    --app-button-flat-border-hover: #{toRem(1)} solid var(--error-main);
    --app-button-flat-border-focused: #{toRem(1)} solid var(--error-light);
    --app-button-flat-border-active: #{toRem(1)} solid var(--error-light);

    --app-button-none-bg-hover: var(--background-error-light);
    --app-button-none-bg-focused: var(--background-error-light);
    --app-button-none-bg-active: var(--background-error-light);

    --app-button-none-text: var(--error-main);
    --app-button-none-text-hover: var(--error-main);
    --app-button-none-text-focused: var(--error-light);
    --app-button-none-text-active: var(--error-light);

    &.app-button--text {
      --app-button-text: var(--text-primary-invert-main);
      --app-button-text-hover: var(--primary-light);
      --app-button-text-focused: var(--primary-dark);
      --app-button-text-active: var(--primary-dark);
    }
  }

  &--none {
    $flat-border-hover: #{toRem(1)} solid var(--primary-light);

    --app-button-flat-bg-hover: var(--background-primary-main);
    --app-button-flat-bg-focused: var(--background-primary-main);
    --app-button-flat-bg-active: var(--background-primary-main);

    --app-button-flat-text: var(--text-primary-light);
    --app-button-flat-text-hover: var(--primary-light);
    --app-button-flat-text-focused: var(--primary-main);
    --app-button-flat-text-active: var(--primary-main);

    --app-button-flat-border: #{toRem(1)} solid var(--border-primary-light);
    --app-button-flat-border-hover: #{$flat-border-hover};
    --app-button-flat-border-focused: #{toRem(1)} solid var(--primary-main);
    --app-button-flat-border-active: #{toRem(1)} solid var(--primary-main);

    --app-button-none-bg-hover: var(--background-primary-main);
    --app-button-none-bg-focused: var(--background-primary-main);
    --app-button-none-bg-active: var(--background-primary-main);

    --app-button-none-text: var(--text-primary-light);
    --app-button-none-text-hover: var(--text-primary-light);
    --app-button-none-text-focused: var(--primary-main);
    --app-button-none-text-active: var(--primary-main);

    &.app-button--text {
      --app-button-text: var(--text-primary-light);
      --app-button-text-hover: var(--primary-light);
      --app-button-text-focused: var(--primary-main);
      --app-button-text-active: var(--primary-main);
    }
  }

  &--large {
    padding: toRem(12) toRem(16);
    grid-gap: toRem(8);

    @include p-16-semi-bold;
  }

  &--medium {
    padding: toRem(12) toRem(16);
    grid-gap: toRem(8);

    @include p-14-semi-bold;
  }

  &--border-circle {
    border-radius: toRem(50);
  }

  &--border-rounded {
    border-radius: var(--border-radius-main);
  }

  &--text {
    --app-button-bg: none;
    --app-button-bg-hover: none;
    --app-button-bg-focused: none;
    --app-button-bg-active: none;

    --app-button-border: none;
    --app-button-border-hover: none;
    --app-button-border-focused: none;
    --app-button-border-active: none;

    padding: 0;

    &:not([disabled]):hover,
    &:not([disabled]):focus,
    &:not([disabled]):active {
      text-decoration: underline;
    }
  }
}

.app-button__icon-left,
.app-button__icon-right {
  height: toRem(25);
  width: toRem(25);

  .app-button--loading & {
    animation: spin 2s linear infinite;
  }
}

.app-button__text {
  color: inherit;
  font: inherit;
  pointer-events: none;
  word-break: break-all;
  min-width: 0;

  @include text-ellipsis;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
