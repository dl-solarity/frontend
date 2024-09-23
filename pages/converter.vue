<template>
  <div class="converter-page">
    <h2>{{ $t('converter-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabItems" />
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

enum TAB_IDS {
  unitConverterForm = 'unit-converter-form',
  numberConverterForm = 'number-converter-form',
  asciiConverterForm = 'ascii-converter-form',
}

const { t } = i18n.global
const tabItems = computed<Tab[]>(() => [
  {
    title: t('converter-page.unit-converter-form-tab'),
    id: TAB_IDS.unitConverterForm,
    route: { name: ROUTE_NAMES.converterUnit },
  },
  {
    title: t('converter-page.number-converter-form-tab'),
    id: TAB_IDS.numberConverterForm,
    route: { name: ROUTE_NAMES.converterNumber },
  },
  {
    title: t('converter-page.ascii-converter-form-tab'),
    id: TAB_IDS.asciiConverterForm,
    route: { name: ROUTE_NAMES.converterAscii },
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
