<template>
  <div class="address-predictor-page">
    <h2>{{ $t('address-predictor-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="address-predictor-page__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { type Tab } from '@/types'
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: ROUTE_PATH.addressPredicatorCreate,
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
    route: ROUTE_PATH.addressPredicatorCreate,
  },
  {
    title: t('address-predictor-page.create2-address-form-tab'),
    id: TABS_IDS.create2AddressForm,
    route: ROUTE_PATH.addressPredicatorCreate2,
  },
])
</script>

<style lang="scss" scoped>
.address-predictor-page {
  @include solidity-tools-page-base;
}

.address-predictor-page__content {
  @include solidity-tools-page-content;
}
</style>
