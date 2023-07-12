<script lang="ts" setup></script>

<template>
  <div class="default">
    <app-navbar />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default {
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
