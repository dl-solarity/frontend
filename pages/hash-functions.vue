<template>
  <div class="hash-functions-page">
    <page-title :title="$t('hash-functions-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="TABS_LIST" />
      <div class="content">
        <template v-for="tab in TABS_LIST" :key="tab.id">
          <hash-function-form
            v-show="currentTab === tab.id"
            :title="tab.title"
            :decode="tab.func"
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
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'solidity-tools',
})

const TABS_LIST = [
  {
    title: 'Keccak256',
    id: 'keccak256',
    func: keccak256,
  },
  {
    title: 'Sha256',
    id: 'sha256',
    func: sha256,
  },
  {
    title: 'Ripemd160',
    id: 'ripemd160',
    func: ripemd160,
  },
]
const currentTab = ref(TABS_LIST[0].id)
</script>

<style lang="scss" scoped>
.hash-functions-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
