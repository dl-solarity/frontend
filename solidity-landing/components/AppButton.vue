<script lang="ts" setup>
import { Icon } from '#components'

import { computed, useAttrs } from 'vue'
import { ICON_NAMES } from '@/enums'

type SCHEMES = 'filled' | 'flat' | 'default'

type MODIFICATIONS = 'border-circle' | 'border-rounded' | 'default'

type COLORS =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'

type SIZES = 'large' | 'medium' | 'small' | 'x-small' | 'default'

const props = withDefaults(
  defineProps<{
    text?: string
    scheme?: SCHEMES
    modification?: MODIFICATIONS
    color?: COLORS
    size?: SIZES
    route?: string
    href?: string
    iconLeft?: ICON_NAMES
    iconRight?: ICON_NAMES
  }>(),
  {
    text: '',
    scheme: 'flat',
    modification: 'border-circle',
    color: 'primary',
    size: 'medium',
    route: undefined,
    href: '',
    iconLeft: undefined,
    iconRight: undefined,
  },
)

const attrs = useAttrs()

const isDisabled = computed((): boolean =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const buttonClasses = computed(() =>
  [
    'app-button',
    `app-button--${props.scheme}`,
    `app-button--${props.modification}`,
    `app-button--${props.color}`,
    `app-button--${props.size}`,
    ...(isDisabled.value ? ['app-button--disabled'] : []),
  ].join(' '),
)
</script>

<template>
  <template v-if="route">
    <router-link
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :to="route"
    >
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </router-link>
  </template>
  <template v-else-if="href">
    <a class="app-button" :class="buttonClasses" v-bind="$attrs" :href="href">
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </a>
  </template>
  <template v-else>
    <button
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :disabled="isDisabled"
      :type="$attrs.type || 'button'"
    >
      <icon v-if="iconLeft" class="app-button__icon-left" :name="iconLeft" />
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
      <icon v-if="iconRight" class="app-button__icon-right" :name="iconRight" />
    </button>
  </template>
</template>

<style lang="scss" scoped>
.app-button {
  --button-transition-duration: 0.2s;

  outline: 0;
  font-family: var(--app-font-family);
  margin: 0;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  display: grid;
  width: min-content;
  grid: auto / auto-flow max-content;
  align-items: center;
  justify-content: center;
  transition: var(--button-transition-duration) ease-in;
  transition-property: background-color, color;
  text-decoration: none;
  border: var(--app-button-border);
  background-color: var(--app-button-bg);
  color: var(--app-button-text);

  &:disabled,
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(0.75);
    opacity: 0.5;
  }

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    text-decoration: none;
    transition-timing-function: ease-out;
    color: var(--app-button-text-hover);
    background-color: var(--app-button-bg-hover);
    border-color: var(--app-button-border-hover);
    border: var(--app-button-border-hover);
  }

  &:not([disabled]):active {
    text-decoration: none;
    transition-timing-function: ease-out;
    background-color: var(--app-button-bg-active);
    border: var(--app-button-border-active);
  }

  &--filled {
    --app-button-filled-bg: var(--primary-main);
    --app-button-filled-bg-hover: var(--primary-dark);
    --app-button-filled-bg-active: var(--primary-dark);

    --app-button-filled-text: var(--text-primary-invert-main);
    --app-button-filled-text-hover: var(--text-primary-invert-main);

    --app-button-bg: var(--app-button-filled-bg);
    --app-button-bg-hover: var(--app-button-filled-bg-hover);
    --app-button-bg-active: var(--app-button-filled-bg-active);

    --app-button-text: var(--app-button-filled-text);
    --app-button-text-hover: var(--app-button-filled-text-hover);

    --app-button-border: 0;
    --app-button-border-hover: 0;
    --app-button-border-active: 0;
  }

  &--flat {
    --app-button-flat-text: var(--text-primary-main);
    --app-button-flat-text-hover: var(--text-primary-dark);

    --app-button-flat-border: #{toRem(2)} solid var(--text-primary-light);
    --app-button-flat-border-hover: var(--app-button-flat-border);
    --app-button-flat-border-active: var(--app-button-flat-border);

    --app-button-bg: transparent;
    --app-button-bg-hover: transparent;
    --app-button-bg-active: transparent;

    --app-button-text: var(--app-button-flat-text);
    --app-button-text-hover: var(--app-button-flat-text-hover);

    --app-button-border: var(--app-button-flat-border);
    --app-button-border-hover: #{toRem(2)} solid var(--text-primary-dark);
    --app-button-border-active: #{toRem(2)} solid var(--text-primary-dark);
  }

  &--success {
    --app-button-flat-text: var(--success-main);
    --app-button-flat-text-hover: var(--success-dark);
    --app-button-flat-border: #{toRem(2)} solid var(--success-main);
    --app-button-flat-border-hover: #{toRem(2)} solid var(--success-dark);
    --app-button-flat-border-active: #{toRem(2)} solid var(--success-dark);

    --app-button-filled-bg: var(--success-main);
    --app-button-filled-bg-hover: var(--success-dark);
    --app-button-filled-bg-active: var(--success-dark);
  }

  &--error {
    --app-button-flat-text: var(--error-main);
    --app-button-flat-text-hover: var(--error-dark);
    --app-button-flat-border: #{toRem(2)} solid var(--error-main);
    --app-button-flat-border-hover: #{toRem(2)} solid var(--error-dark);
    --app-button-flat-border-active: #{toRem(2)} solid var(--error-dark);

    --app-button-filled-bg: var(--error-main);
    --app-button-filled-bg-hover: var(--error-dark);
    --app-button-filled-bg-active: var(--error-dark);
  }

  &--warning {
    --app-button-flat-text: var(--warning-main);
    --app-button-flat-text-hover: var(--warning-dark);
    --app-button-flat-border: #{toRem(2)} solid var(--warning-dark);
    --app-button-flat-border-hover: #{toRem(2)} solid var(--warning-dark);
    --app-button-flat-border-active: #{toRem(2)} solid var(--warning-dark);

    --app-button-filled-bg: var(--warning-main);
    --app-button-filled-bg-hover: var(--warning-dark);
    --app-button-filled-bg-active: var(--warning-dark);
  }

  &--info {
    --app-button-flat-text: var(--info-main);
    --app-button-flat-text-hover: var(--info-dark);
    --app-button-flat-border: #{toRem(2)} solid var(--info-main);
    --app-button-flat-border-hover: #{toRem(2)} solid var(--info-dark);
    --app-button-flat-border-active: #{toRem(2)} solid var(--info-dark);

    --app-button-filled-bg: var(--info-main);
    --app-button-filled-bg-hover: var(--info-dark);
    --app-button-filled-bg-active: var(--info-dark);
  }

  &--border-circle {
    border-radius: toRem(50);
  }

  &--border-rounded {
    border-radius: toRem(10);
  }

  &--large {
    padding: toRem(24) toRem(50);
    grid-gap: toRem(16);
  }

  &--medium {
    padding: toRem(16) toRem(30);
    font-size: toRem(16);
    line-height: 1.4;
    font-weight: 600;
    grid-gap: toRem(12);
    letter-spacing: 0;
  }

  &--small {
    padding: toRem(8) toRem(15);
    grid-gap: toRem(8);
  }

  .app-button__icon-left,
  .app-button__icon-right {
    height: 1.2em;
    width: 1.2em;
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
</style>
