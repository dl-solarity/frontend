<template>
  <div class="abi-page">
    <page-title :title="$t('abi-page.main-title')" />
    <div class="block">
      <app-tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <abi-encode-form
          v-show="currentTab.id === TABS_IDS.encoder"
          :title="currentTab.title"
        />
        <abi-decode-form
          v-show="currentTab.id === TABS_IDS.decoder"
          :title="currentTab.title"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs, PageTitle } from '#components'
import { definePageMeta } from '#imports'
import { AbiEncodeForm, AbiDecodeForm } from '@/forms'
import { type Tab } from '@/types'
import { computed, ref } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
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
  },
  {
    title: t('abi-page.decoder-tab'),
    id: TABS_IDS.decoder,
  },
])
const currentTab = ref<Tab>(tabsList.value[0])
</script>

<style lang="scss" scoped>
.abi-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
