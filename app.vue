<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <dev-only>
    <client-only>
      <vpc />
    </client-only>
  </dev-only>
</template>

<script lang="ts" setup>
import 'virtual:svg-icons-register'
import Vpc from './vite-plugin-checker.vue'
</script>
