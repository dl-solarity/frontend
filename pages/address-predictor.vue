<template>
  <div class="address-predictor-page">
    <page-title :title="$t('address-predictor-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <create-address-form
          v-show="currentTab.id === TABS_IDS.createAddressForm"
        />
        <create2-address-form
          v-show="currentTab.id === TABS_IDS.create2AddressForm"
        />
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

enum TABS_IDS {
  createAddressForm = 'create-address-form',
  create2AddressForm = 'create2-address-form',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('address-predictor-page.create-address-form-tab'),
    id: TABS_IDS.createAddressForm,
  },
  {
    title: t('address-predictor-page.create2-address-form-tab'),
    id: TABS_IDS.create2AddressForm,
  },
])
const currentTab = ref<Tab>(tabsList.value[0])
</script>

<style lang="scss" scoped>
.address-predictor-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
