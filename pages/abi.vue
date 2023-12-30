<template>
  <div class="abi-page">
    <h2>{{ $t('abi-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="abi-page__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { type Tab } from '@/types'
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: ROUTE_PATH.abiEncoder,
})

enum TABS_IDS {
  encoder = 'encoder',
  decoder = 'decoder',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('abi-page.encoder-tab'),
    id: TABS_IDS.encoder,
    route: ROUTE_PATH.abiEncoder,
  },
  {
    title: t('abi-page.decoder-tab'),
    id: TABS_IDS.decoder,
    route: ROUTE_PATH.abiDecoder,
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
