<template>
  <main class="home-page">
    <stats-preview />
    <projects-info />
  </main>
</template>

<script lang="ts" setup>
import { StatsPreview, ProjectsInfo } from '#components'
</script>

<style lang="scss" scoped>
.home-page {
  margin-top: 0;
  padding: 0;
  background-image: url('/branding/bg.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;

  @include respond-to(small) {
    background-image: url('/branding/bg-small.png');
  }
}
</style>
