<template>
  <div class="unix-epoch-page">
    <page-title :title="$t('unix-epoch-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTabId" :tabs="tabsList" />
      <div class="content">
        <date-form v-show="currentTabId === tabsList[0].id" />
        <timestamp-form v-show="currentTabId === tabsList[1].id" />
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
const { t } = i18n.global

const tabsList = computed<Tab[]>(() => [
  {
    title: t('unix-epoch-page.date-form-tab'),
    id: 'date',
  },
  {
    title: t('unix-epoch-page.timestamp-form-tab'),
    id: 'timestamp',
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
