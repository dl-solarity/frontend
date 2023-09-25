<template>
  <div class="app-notification">
    <app-icon class="app-notification__icon" :name="iconName" />
    <div class="app-notification__details">
      <p class="app-notification__title">
        {{ title }}
      </p>
      <p class="app-notification__message">
        {{ message }}
      </p>
    </div>
    <app-button
      class="app-notification__close-btn"
      color="secondary"
      modification="text"
      :icon-left="ICON_NAMES.x"
      @click="emit('close-toast')"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton, AppIcon } from '#components'
import { ICON_NAMES } from '@/enums'

const emit = defineEmits<{
  (event: 'close-toast'): void
}>()

defineProps<{
  title: string
  message: string
  iconName: ICON_NAMES
}>()
</script>

<style lang="scss">
@import 'vue-toastification/src/scss/index';

.Vue-Toastification__toast {
  padding: toRem(24) toRem(70) toRem(24) toRem(24);
  background-color: var(--background-primary-main);
  border-radius: var(--border-radius-main);
  width: 100%;
  max-width: toRem(420);
}

.Vue-Toastification__progress-bar {
  background: var(--text-primary-main);
}

.app-notification {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: toRem(16);
}

.app-notification .app-notification__icon {
  max-width: toRem(24);
  max-height: toRem(24);

  .Vue-Toastification__toast--success & {
    color: var(--success-main);
  }

  .Vue-Toastification__toast--error & {
    color: var(--error-main);
  }

  .Vue-Toastification__toast--warning & {
    color: var(--warning-main);
  }

  .Vue-Toastification__toast--info & {
    color: var(--info-main);
  }
}

.app-notification__details {
  display: grid;
  grid-gap: toRem(4);
  width: 100%;
}

.app-notification__title {
  @include p-16-medium;
}

.app-notification__message {
  color: var(--text-primary-main);

  @include p-14-regular;
}

.app-notification__close-btn {
  position: absolute;
  top: toRem(24);
  right: toRem(24);
}
</style>
