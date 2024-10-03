<template>
  <div :class="alertClasses">
    <app-icon class="app-alert__icon" :name="alertIcon" />
    <div class="app-alert__details">
      <p class="app-alert__title">
        {{ title }}
      </p>
      <p class="app-alert__message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppIcon } from '#components'
import { ICON_NAMES } from '@/enums'

const props = defineProps<{
  title?: string
  message?: string
  type: 'success' | 'error'
}>()

const alertClasses = computed(() => ['app-alert', `app-alert--${props.type}`])
const alertIcon = computed(() => {
  switch (props.type) {
    case 'success':
      return ICON_NAMES.checkCircle
    case 'error':
      return ICON_NAMES.xCircle
  }
})
</script>

<style scoped lang="scss">
.app-alert {
  display: flex;
  align-items: center;
  gap: toRem(12);
  background: var(--app-alert-bg);
  border: var(--app-alert-border);
  color: var(--app-alert-color);
  border-radius: var(--field-border-radius);
  padding: toRem(16);

  @include respond-to(small) {
    padding: toRem(10) toRem(12);
  }

  & .app-alert__title {
    color: var(--app-alert-color);

    @include p-16-semi-bold;
  }

  & .app-alert__message {
    color: var(--app-alert-color);

    @include p-14-semi-bold;
  }

  & .app-alert__icon {
    width: toRem(20);
    aspect-ratio: 1;
  }

  &--success {
    --app-alert-bg: var(--background-success-main);
    --app-alert-border: #{toRem(1)} solid var(--success-main);
    --app-alert-color: var(--success-main);
  }

  &--error {
    --app-alert-bg: var(--background-error-main);
    --app-alert-border: #{toRem(1)} solid var(--error-main);
    --app-alert-color: var(--error-main);
  }
}
</style>
