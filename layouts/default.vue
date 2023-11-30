<template>
  <div class="default">
    <app-navbar />
    <slot />
    <app-footer class="default__footer" />
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable-next-line */
body,
#__nuxt {
  background: var(--background-primary-main);
  color: var(--text-primary-light);
}

.default {
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  min-height: vh(100);
  background: var(--background-primary-main);
  color: var(--text-primary-light);
  transition: min-height var(--transition-duration-medium)
    var(--transition-timing-default);
}

.default__footer {
  margin-top: auto;
}
</style>
