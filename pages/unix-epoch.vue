<template>
  <div class="unix-epoch-page">
    <page-title :title="$t('unix-epoch-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="TABS" />
      <div class="content">
        <date-form v-show="currentTab === TABS[0].id" />
        <timestamp-form v-show="currentTab === TABS[1].id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { DateForm, TimestampForm } from '@/forms'
import { ref } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})
const { t } = i18n.global
const TABS = [
  {
    title: t('unix-epoch-page.date-form-tab'),
    id: 'date',
  },
  {
    title: t('unix-epoch-page.timestamp-form-tab'),
    id: 'timestamp',
  },
]
const currentTab = ref(TABS[0].id)
</script>

<style lang="scss" scoped>
.unix-epoch-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
