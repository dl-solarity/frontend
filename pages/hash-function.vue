<template>
  <div class="hash-functions-page">
    <h2>{{ $t('hash-functions-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="TAB_ITEMS" />
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
  redirect: { name: ROUTE_NAMES.hashFunctionKeccak256Id },
})

enum TAB_IDS {
  keccak256 = 'keccak256',
  sha256 = 'sha256',
  ripemd160 = 'ripemd160',
  poseidon16 = 'poseidon16',
}

const TAB_ITEMS: Tab[] = [
  {
    title: 'Keccak256',
    id: TAB_IDS.keccak256,
    route: { name: ROUTE_NAMES.hashFunctionKeccak256Id },
  },
  {
    title: 'Sha256',
    id: TAB_IDS.sha256,
    route: { name: ROUTE_NAMES.hashFunctionSha256Id },
  },
  {
    title: 'Ripemd160',
    id: TAB_IDS.ripemd160,
    route: { name: ROUTE_NAMES.hashFunctionRipemd160Id },
  },
  {
    title: 'Poseidon (iden3)',
    id: TAB_IDS.poseidon16,
    route: { name: ROUTE_NAMES.hashFunctionPoseidon16Id },
  },
]
</script>

<style lang="scss" scoped>
.hash-functions-page {
  @include solidity-tools-page-base;
}

.hash-functions-page__content {
  @include solidity-tools-page-content;

  padding-bottom: 0;

  @include respond-to(medium) {
    padding-bottom: 0;
  }
}
</style>
