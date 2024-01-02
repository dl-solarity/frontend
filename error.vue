<template>
  <div class="error" />
</template>

<script lang="ts" setup>
import { navigateTo } from '#imports'
import { ROUTE_NAMES } from '@/enums'
navigateTo({ name: ROUTE_NAMES.app }, { redirectCode: 301 })
</script>
