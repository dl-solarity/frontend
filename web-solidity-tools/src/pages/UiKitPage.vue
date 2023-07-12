<template>
  <div class="ui-kit-page">
    <div class="ui-kit-page__buttons">
      <app-button size="small" :text="'button'" />
      <app-button size="small" :text="'button'" scheme="flat" />
      <app-button size="small" :text="'button'" scheme="none" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
</script>

<style lang="scss" scoped>
.ui-kit-page {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  padding: toRem(24) var(--app-padding-right) toRem(24) var(--app-padding-left);
}

.ui-kit-page__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: toRem(12);
}
</style>
