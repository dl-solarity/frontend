<script lang="ts" setup>
import { Icon } from '#components'

import { ICON_NAMES } from '@/enums'

withDefaults(
  defineProps<{
    iconName?: ICON_NAMES
    message: string
  }>(),
  {
    iconName: ICON_NAMES.archive,
  },
)
</script>

<template>
  <div class="no-data-message">
    <icon class="no-data-message__icon" :name="iconName" />
    <span class="no-data-message__message">
      {{ message }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.no-data-message {
  display: grid;
  place-items: center;
  grid-gap: toRem(12);
}

.no-data-message__icon {
  color: var(--text-primary-light);
  font-size: toRem(48);
}

.no-data-message__message {
  color: var(--text-primary-light);
  font-size: toRem(18);
}
</style>
