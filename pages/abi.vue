<template>
  <div class="abi-page">
    <h2>{{ $t('abi-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabItems" />
      <div class="abi-page__content">
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
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.abiEncoderId },
})

enum TAB_IDS {
  encoder = 'encoder',
  decoder = 'decoder',
}

const { t } = i18n.global
const tabItems = computed<Tab[]>(() => [
  {
    title: t('abi-page.encoder-tab'),
    id: TAB_IDS.encoder,
    route: { name: ROUTE_NAMES.abiEncoderId },
  },
  {
    title: t('abi-page.decoder-tab'),
    id: TAB_IDS.decoder,
    route: { name: ROUTE_NAMES.abiDecoderId },
  },
])
</script>

<style lang="scss" scoped>
.abi-page {
  @include solidity-tools-page-base;
}

.abi-page__content {
  @include solidity-tools-page-content;

  padding-bottom: 0;

  @include respond-to(medium) {
    padding-bottom: 0;
  }
}
</style>
