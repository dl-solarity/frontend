<template>
  <div class="address-utils-page">
    <h2>{{ $t('address-utils-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="address-utils-page__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_NAMES } from '@/enums'
import { type Tab } from '@/types'
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.addressUtilsCommonAddresses },
})

enum TABS_IDS {
  commonAddressesForm = 'common-addresses-form',
  createAddressForm = 'create-address-form',
  create2AddressForm = 'create2-address-form',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('address-utils-page.common-addresses-form-tab'),
    id: TABS_IDS.commonAddressesForm,
    route: { name: ROUTE_NAMES.addressUtilsCommonAddresses },
  },
  {
    title: t('address-utils-page.create-address-form-tab'),
    id: TABS_IDS.createAddressForm,
    route: { name: ROUTE_NAMES.addressUtilsCreate },
  },
  {
    title: t('address-utils-page.create2-address-form-tab'),
    id: TABS_IDS.create2AddressForm,
    route: { name: ROUTE_NAMES.addressUtilsCreate2 },
  },
])
</script>

<style lang="scss" scoped>
.address-utils-page {
  @include solidity-tools-page-base;
}

.address-utils-page__content {
  @include solidity-tools-page-content;
}
</style>
