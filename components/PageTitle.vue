<template>
  <div class="page-title">
    <h2 class="page-title__title">
      {{ title }}
    </h2>
    <app-button
      class="page-title__sidebar-button"
      scheme="none"
      size="none"
      :icon-left="$icons.burger"
      @click="openSidebar"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { bus, BUS_EVENTS } from '@/helpers'

const openSidebar = () => {
  bus.emit(BUS_EVENTS.toggleSidebar)
}

defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.page-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title__title {
  @include text-ellipsis;

  @include respond-to(small) {
    font-size: toRem(32);
  }
}

.page-title__sidebar-button {
  display: none;

  @include respond-to(medium) {
    display: flex;
    width: toRem(32);
    height: toRem(32);
    color: var(--text-primary-main);
  }
}
</style>
