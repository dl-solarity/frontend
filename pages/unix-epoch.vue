<template>
  <div class="unix-epoch-page">
    <page-title :title="$t('unix-epoch-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTabId" :tabs="tabsList" />
      <div class="content">
        <date-form v-show="currentTabId === TABS_IDS.date" />
        <timestamp-form v-show="currentTabId === TABS_IDS.timestamp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { DateForm, TimestampForm } from '@/forms'
import { type Tab } from '@/types'
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

enum TABS_IDS {
  date = 'date',
  timestamp = 'timestamp',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('unix-epoch-page.date-form-tab'),
    id: TABS_IDS.date,
  },
  {
    title: t('unix-epoch-page.timestamp-form-tab'),
    id: TABS_IDS.timestamp,
  },
])
const currentTabId = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.unix-epoch-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
