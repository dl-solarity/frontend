<template>
  <div class="converter-page">
    <page-title :title="$t('converter-page.main-title')" />
    <div class="block">
      <app-tabs :tabs="tabsList" />
      <div class="content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs, PageTitle } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { type Tab } from '@/types'
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: ROUTE_PATH.converterUnit,
})

enum TABS_IDS {
  unitConverterForm = 'unit-converter-form',
  numberConverterForm = 'number-converter-form',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('converter-page.unit-converter-form-tab'),
    id: TABS_IDS.unitConverterForm,
    route: ROUTE_PATH.converterUnit,
  },
  {
    title: t('converter-page.number-converter-form-tab'),
    id: TABS_IDS.numberConverterForm,
    route: ROUTE_PATH.converterNumber,
  },
])
</script>

<style lang="scss" scoped>
.converter-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
