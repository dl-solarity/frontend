<template>
  <div class="abi-page">
    <page-title :title="$t('abi-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <template v-for="tab in tabsList" :key="tab.id">
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
import { computed, ref } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

enum TAB_IDS {
  encoder = 'encoder',
  decoder = 'decoder',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('abi-page.encoder-tab'),
    id: TAB_IDS.encoder,
  },
  // TODO: decoder
  // {
  //   title: t('abi-page.decoder-tab'),
  //   id: TAB_IDS.decoder,
  // },
])
const currentTab = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.abi-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
