<template>
  <div class="abi-page">
    <page-title :title="$t('abi-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="TABS_LIST" />
      <div class="content">
        <template v-for="tab in TABS_LIST" :key="tab.id">
          <abi-encode-form
            v-show="currentTab === TAB_IDS.encoder"
            :title="tab.title"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { definePageMeta } from '#imports'
import { AbiEncodeForm } from '@/forms'
import { type Tab } from '@/types'
import { ref } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

enum TAB_IDS {
  encoder = 'encoder',
  decoder = 'decoder',
}

const { t } = i18n.global
const TABS_LIST: Tab[] = [
  {
    title: t('abi-page.encoder-tab'),
    id: TAB_IDS.encoder,
  },
  // TODO: decoder
  // {
  //   title: t('abi-page.decoder-tab'),
  //   id: TAB_IDS.decoder,
  // },
]
const currentTab = ref(TABS_LIST[0].id)
</script>

<style lang="scss" scoped>
.abi-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
