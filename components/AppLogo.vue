<template>
  <nuxt-link class="app-logo" :to="{ name: $routes.app }" @click="onClick">
    <img class="app-logo__img" src="/branding/logo.png" :alt="config.NAME" />
    <h3 class="app-logo__title">
      {{ $t('app-logo.title') }}
    </h3>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { useRoute } from '#app'
import { config } from '@/config'
import { ROUTE_NAMES } from '@/enums'

const route = useRoute()

const onClick = () => {
  if (route.name === ROUTE_NAMES.app) window.location.reload()
}
</script>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  max-width: max-content;
  transition: color var(--transition-duration-fast)
    var(--transition-timing-default);

  &:hover {
    color: var(--primary-light);
  }

  &:focus,
  &:active {
    color: var(--primary-main);
  }
}

.app-logo__img {
  max-width: toRem(32);
  max-height: toRem(32);
  margin-left: toRem(-8);
}

.app-logo__title {
  font-size: toRem(20);
}
</style>
