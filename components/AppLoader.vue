<template>
  <div class="app-loader">
    <client-only>
      <vue3-lottie
        class="app-loader__inner"
        :animation-data="animationData"
        loop
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import animationData from '@/assets/loader.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<style lang="scss" scoped>
.app-loader__inner {
  width: toRem(96);
  height: toRem(32);
}
</style>
