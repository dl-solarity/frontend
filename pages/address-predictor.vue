<template>
  <div class="address-predictor-page">
    <page-title :title="$t('address-predictor-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <create-address-form v-show="currentTab === tabsList[0].id" />
        <create2-address-form v-show="currentTab === tabsList[1].id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { CreateAddressForm, Create2AddressForm } from '@/forms'
import { type Tab } from '@/types'
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('address-predictor-page.create-address-form-tab'),
    id: 'create-address-form',
  },
  {
    title: t('address-predictor-page.create2-address-form-tab'),
    id: 'create2-address-form',
  },
])
const currentTab = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.address-predictor-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
