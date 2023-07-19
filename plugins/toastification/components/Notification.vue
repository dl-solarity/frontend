<script lang="ts" setup>
import { ICON_NAMES } from '@/enums'

withDefaults(
  defineProps<{
    title?: string
    message: string
    iconName?: ICON_NAMES
  }>(),
  {
    title: '',
    iconName: ICON_NAMES.check,
  },
)
</script>

<template>
  <div class="notification">
    <icon class="notification__icon" :name="iconName" />
    <div class="notification__details">
      <h4 class="notification__title">
        {{ title }}
      </h4>
      <p class="notification__message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.Vue-Toastification__toast {
  &--success {
    background: var(--success-dark);
  }

  &--error {
    background: var(--error-dark);
  }

  &--warning {
    background: var(--warning-dark);
  }

  &--info {
    background: var(--primary-main);
  }
}

.notification {
  display: grid;
  place-items: center;
  grid-template-columns: max-content 1fr;
  grid-gap: toRem(16);
}

.notification .notification__icon {
  max-width: toRem(48);
  max-height: toRem(48);
}

.notification__details {
  display: grid;
  grid-gap: toRem(4);
  width: 100%;
}

.notification__title {
  color: var(--text-primary-invert-main);
}

.notification__message {
  color: var(--text-primary-invert-main);
}
</style>
