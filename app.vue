<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useViewportSizes } from '@/composables'
import 'virtual:svg-icons-register'
import { onMounted } from 'vue'

onMounted(() => {
  useViewportSizes().assignVhCssVariable()
})
</script>
