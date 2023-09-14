<template>
  <div class="abi-page">
    <page-title :title="$t('abi-page.main-title')" />
    <div class="block">
      <app-tabs :tabs="tabsList" />
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
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
