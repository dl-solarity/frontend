<script lang="ts" setup>
import { ICON_NAMES } from 'enums'

defineProps<{
  name: ICON_NAMES
}>()
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}-icon`" />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  display: grid;
  place-items: center;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}
</style>
