<template>
  <div class="hash-functions-page">
    <h2>{{ $t('hash-functions-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="TABS_LIST" />
      <div class="hash-functions-page__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_NAMES } from '@/enums'
import { type Tab } from '@/types'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.hashFunctionKeccak256 },
})

enum TABS_IDS {
  keccak256 = 'keccak256',
  sha256 = 'sha256',
  ripemd160 = 'ripemd160',
}

const TABS_LIST: Tab[] = [
  {
    title: 'Keccak256',
    id: TABS_IDS.keccak256,
    route: { name: ROUTE_NAMES.hashFunctionKeccak256 },
  },
  {
    title: 'Sha256',
    id: TABS_IDS.sha256,
    route: { name: ROUTE_NAMES.hashFunctionSha256 },
  },
  {
    title: 'Ripemd160',
    id: TABS_IDS.ripemd160,
    route: { name: ROUTE_NAMES.hashFunctionRipemd160 },
  },
]
</script>

<style lang="scss" scoped>
.hash-functions-page {
  @include solidity-tools-page-base;
}

.hash-functions-page__content {
  @include solidity-tools-page-content;
}
</style>
