<template>
  <div class="address-predictor-page">
    <page-title :title="$t('address-predictor-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="TABS" />
      <div class="content">
        <create-form v-show="currentTab === TABS[0].id" />
        <create2-form v-show="currentTab === TABS[1].id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { CreateForm, Create2Form } from '@/forms'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { definePageMeta } from '#imports'
definePageMeta({
  layout: 'solidity-tools',
})

const { t } = useI18n({ useScope: 'global' })
const TABS = [
  {
    title: t('address-predictor-page.create-form-tab'),
    id: 'create',
  },
  {
    title: t('address-predictor-page.create-2-form-tab'),
    id: 'create-2',
  },
]
const currentTab = ref(TABS[0].id)
</script>

<style lang="scss" scoped>
.address-predictor-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
