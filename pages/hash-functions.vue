<template>
  <div class="hash-functions-page">
    <page-title :title="$t('hash-functions-page.main-title')" />
    <div class="block">
      <app-tabs v-model="currentTab" :tabs="TABS_LIST" />
      <div class="content">
        <template v-for="tab in TABS_LIST" :key="tab.id">
          <hash-function-form
            v-show="currentTab.id === tab.id"
            :title="tab.title"
            :decode="hashFunctionsMap[tab.id as TABS_IDS]"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs, PageTitle } from '#components'
import { HashFunctionForm } from '@/forms'
import { sha256, ripemd160, keccak256 } from '@/helpers'
import { type Tab, type HashFunction } from '@/types'
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'solidity-tools',
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
  },
  {
    title: 'Sha256',
    id: TABS_IDS.sha256,
  },
  {
    title: 'Ripemd160',
    id: TABS_IDS.ripemd160,
  },
]
const currentTab = ref<Tab>(TABS_LIST[0])

const hashFunctionsMap: Record<TABS_IDS, HashFunction> = {
  [TABS_IDS.keccak256]: keccak256,
  [TABS_IDS.sha256]: sha256,
  [TABS_IDS.ripemd160]: ripemd160,
}
</script>

<style lang="scss" scoped>
.hash-functions-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
