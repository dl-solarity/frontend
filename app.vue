<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
  <div id="app-modals" />
</template>

<script lang="ts" setup>
import { useViewportSizes } from '@/composables'
import { debounce } from 'lodash-es'
import { onBeforeUnmount, onMounted } from 'vue'
import 'virtual:svg-icons-register'

const { assignVhCssVariable } = useViewportSizes()

const assignVhCssVariableDebounced = debounce(assignVhCssVariable, 200)

onMounted(() => {
  assignVhCssVariable()
  window.addEventListener('resize', assignVhCssVariableDebounced)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', assignVhCssVariableDebounced)
})
</script>
