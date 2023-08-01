<template>
  <div class="hash-functions-page">
    <page-title :title="$t('hash-functions-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTabId" :tabs="TABS_LIST" />
      <div class="content">
        <template v-for="tab in TABS_LIST" :key="tab.id">
          <hash-function-form
            v-show="currentTabId === tab.id"
            :title="tab.title"
            :decode="hashFunctionsMap[tab.id as TAB_IDS]"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { HashFunctionForm } from '@/forms'
import { sha256, ripemd160, keccak256 } from '@/helpers'
import { type Tab, type HashFunction } from '@/types'
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'solidity-tools',
})

enum TAB_IDS {
  keccak256 = 'keccak256',
  sha256 = 'sha256',
  ripemd160 = 'ripemd160',
}

const TABS_LIST: Tab[] = [
  {
    title: 'Keccak256',
    id: TAB_IDS.keccak256,
  },
  {
    title: 'Sha256',
    id: TAB_IDS.sha256,
  },
  {
    title: 'Ripemd160',
    id: TAB_IDS.ripemd160,
  },
]
const currentTabId = ref(TABS_LIST[0].id)

const hashFunctionsMap: Record<TAB_IDS, HashFunction> = {
  [TAB_IDS.keccak256]: keccak256,
  [TAB_IDS.sha256]: sha256,
  [TAB_IDS.ripemd160]: ripemd160,
}
</script>

<style lang="scss" scoped>
.hash-functions-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
