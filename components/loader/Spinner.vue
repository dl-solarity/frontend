<template>
  <div class="spinner">
    <client-only>
      <vue3-lottie
        class="spinner__inner"
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
.spinner__inner {
  width: toRem(80);
  height: toRem(80);
}
</style>
