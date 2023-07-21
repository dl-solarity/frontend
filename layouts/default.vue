<template>
  <div class="default">
    <app-navbar />
    <slot />
    <app-footer class="default__footer" />
  </div>
</template>

<style lang="scss" scoped>
body,
#__nuxt {
  background: var(--background-primary-light);

  color: var(--text-primary-light);
}

.default {
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--background-primary-light);

  color: var(--text-primary-light);
}

.default__footer {
  margin-top: auto;
}
</style>
