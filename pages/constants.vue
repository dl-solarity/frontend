<template>
  <div class="constants">
    <h2>{{ $t('constants.main-title') }}</h2>
    <div>
      <div class="constants__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports'
import { ROUTE_NAMES } from '@/enums'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.constantsBytes },
})
</script>

<style lang="scss" scoped>
.constants {
  @include solidity-tools-page-base;
}

.constants__content {
  @include solidity-tools-page-content;
}
</style>
