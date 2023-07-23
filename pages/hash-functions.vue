<template>
  <div class="hash-functions-page">
    <page-title :title="$t('hash-functions-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <template v-for="tab in tabsList" :key="tab.id">
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
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

const { t } = i18n.global
const tabsList = computed(() => [
  {
    title: t('hash-functions-page.keccak256-tab'),
    id: 'keccak256',
    func: keccak256,
  },
  {
    title: t('hash-functions-page.sha256-tab'),
    id: 'sha256',
    func: sha256,
  },
  {
    title: t('hash-functions-page.ripemd160-tab'),
    id: 'ripemd160',
    func: ripemd160,
  },
])
const currentTab = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.hash-functions-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
