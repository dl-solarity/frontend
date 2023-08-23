<template>
  <div class="converter-page">
    <page-title :title="$t('converter-page.main-title')" />
    <div class="block">
      <app-tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <unit-converter-form
          v-show="currentTab.id === TABS_IDS.unitConverterForm"
        />
        <number-converter-form
          v-show="currentTab.id === TABS_IDS.numberConverterForm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs, PageTitle } from '#components'
import { UnitConverterForm, NumberConverterForm } from '@/forms'
import { type Tab } from '@/types'
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
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
  },
  {
    title: t('converter-page.number-converter-form-tab'),
    id: TABS_IDS.numberConverterForm,
  },
])
const currentTab = ref<Tab>(tabsList.value[0])
</script>

<style lang="scss" scoped>
.converter-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
