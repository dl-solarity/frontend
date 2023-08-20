<template>
  <nuxt-link class="app-logo" :to="$routes.app" @click="onClick">
    <img class="app-logo__img" src="/branding/logo.png" :alt="config.NAME" />
    <h3 class="app-logo__title">
      {{ $t('app-logo.title') }}
    </h3>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { useRoute } from '#app'
import { config } from '@/config'
import { ROUTE_PATH } from '@/constants'

const route = useRoute()

const onClick = () => {
  if (route.path === ROUTE_PATH.app) window.location.reload()
}
</script>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
}

.app-logo__img {
  max-width: toRem(32);
  max-height: toRem(32);
}

.app-logo__title {
  font-size: toRem(20);
}
</style>
