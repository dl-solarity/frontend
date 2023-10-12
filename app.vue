<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div id="app-modals" />
</template>

<script lang="ts" setup>
import { useViewportSizes } from '@/composables'
import { debounce } from 'lodash-es'
import { onBeforeUnmount, onMounted } from 'vue'
import 'virtual:svg-icons-register'

const { assignVhCssVariable } = useViewportSizes()

const assignVhCssVariableDebounced = debounce(assignVhCssVariable, 300)

onMounted(() => {
  window.addEventListener('resize', assignVhCssVariableDebounced)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', assignVhCssVariableDebounced)
})
</script>
