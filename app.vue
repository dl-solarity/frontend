<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
  <div id="app-modals" />
</template>

<script lang="ts" setup>
import { useViewportSizes } from '@/composables'
import { onMounted } from 'vue'
import 'virtual:svg-icons-register'

const { assignVhCssVariable } = useViewportSizes()

onMounted(() => {
  assignVhCssVariable()
})
</script>
