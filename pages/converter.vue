<template>
  <div class="converter-page">
    <h2>{{ $t('converter-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="converter-page__content">
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
  redirect: { name: ROUTE_NAMES.converterUnit },
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
    route: { name: ROUTE_NAMES.converterUnit },
  },
  {
    title: t('converter-page.number-converter-form-tab'),
    id: TABS_IDS.numberConverterForm,
    route: { name: ROUTE_NAMES.converterNumber },
  },
])
</script>

<style lang="scss" scoped>
.converter-page {
  @include solidity-tools-page-base;
}

.converter-page__content {
  @include solidity-tools-page-content;
}
</style>
