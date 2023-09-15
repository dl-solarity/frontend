<template>
  <div class="hash-functions-page">
    <page-title :title="$t('hash-functions-page.main-title')" />
    <div class="block">
      <app-tabs :tabs="TABS_LIST" />
      <div class="content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs, PageTitle } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { type Tab } from '@/types'

definePageMeta({
  layout: 'solidity-tools',
  redirect: ROUTE_PATH.hashFunctionKeccak256,
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
    route: ROUTE_PATH.hashFunctionKeccak256,
  },
  {
    title: 'Sha256',
    id: TABS_IDS.sha256,
    route: ROUTE_PATH.hashFunctionSha256,
  },
  {
    title: 'Ripemd160',
    id: TABS_IDS.ripemd160,
    route: ROUTE_PATH.hashFunctionRipemd160,
  },
]
</script>

<style lang="scss" scoped>
.hash-functions-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
