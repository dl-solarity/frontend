<template>
  <router-link class="app-logo" :to="{ name: $routes.addressPredicator }">
    <img
      class="app-logo__img"
      src="/branding/logo.png"
      :alt="$config.APP_NAME"
    />
    <span class="app-logo__text fs-secondary">{{ $t('app-logo.title') }}</span>
  </router-link>
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
  font-weight: 600;
  line-height: 120%;
  color: var(--text-primary-light);
}
</style>
