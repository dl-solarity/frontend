<template>
  <div class="hash-functions-page">
    <h2>{{ $t('hash-functions-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabItems" />
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
import { computed } from 'vue'
import { type Tab } from '@/types'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.hashFunctionKeccak256Id },
})

enum TAB_IDS {
  keccak256 = 'keccak256',
  sha256 = 'sha256',
  ripemd160 = 'ripemd160',
}

const { t } = i18n.global
const tabItems = computed<Tab[]>(() => [
  {
    title: t('hash-functions-page.keccak256'),
    id: TAB_IDS.keccak256,
    route: { name: ROUTE_NAMES.hashFunctionKeccak256Id },
  },
  {
    title: t('hash-functions-page.sha256'),
    id: TAB_IDS.sha256,
    route: { name: ROUTE_NAMES.hashFunctionSha256Id },
  },
  {
    title: t('hash-functions-page.ripemd160'),
    id: TAB_IDS.ripemd160,
    route: { name: ROUTE_NAMES.hashFunctionRipemd160Id },
  },
])
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
