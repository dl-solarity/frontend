<template>
  <div class="default">
    <app-navbar />
    <slot />
    <app-footer class="default__footer" />
  </div>
</template>

<style lang="scss" scoped>
.default {
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.default__footer {
  margin-top: auto;
}
</style>
