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
}
</style>
