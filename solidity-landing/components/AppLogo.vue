<script lang="ts" setup>
import { config } from '@/config'
</script>

<template>
  <NuxtLink class="app-logo" :to="$routes.app">
    <img
      class="app-logo__img"
      src="/branding/logo.png"
      :alt="config.APP_NAME"
    />
    <span class="app-logo__text">{{ $t('app-logo.title') }}</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  height: 100%;
}

.app-logo__img {
  max-width: toRem(32);
  max-height: toRem(32);
}

.app-logo__text {
  font-size: toRem(20);
  font-weight: 500;
  line-height: 120%;
}
</style>
