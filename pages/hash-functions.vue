<template>
  <div class="hash-functions">
    <page-title :title="$t('hash-functions.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <hash-function-form
          v-show="currentTab === tabsList[0].id"
          :title="tabsList[0].title"
          :decode="keccak256"
        />
        <hash-function-form
          v-show="currentTab === tabsList[1].id"
          :title="tabsList[1].title"
          :decode="sha256"
        />
        <hash-function-form
          v-show="currentTab === tabsList[2].id"
          :title="tabsList[2].title"
          :decode="ripemd160"
        />
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
    title: t('hash-functions.keccak256-tab'),
    id: 'keccak256',
  },
  {
    title: t('hash-functions.sha256-tab'),
    id: 'sha256',
  },
  {
    title: t('hash-functions.ripemd160-tab'),
    id: 'ripemd160',
  },
])
const currentTab = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.hash-functions {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
