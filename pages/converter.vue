<template>
  <div class="converter-page">
    <page-title :title="$t('converter-page.main-title')" />
    <div class="block">
      <tabs v-model="currentTab" :tabs="tabsList" />
      <div class="content">
        <unit-converter-form v-show="currentTab === tabsList[0].id" />
        <number-converter-form v-show="currentTab === tabsList[1].id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, PageTitle } from '#components'
import { UnitConverterForm, NumberConverterForm } from '@/forms'
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
})

const { t } = i18n.global
const tabsList = computed(() => [
  {
    title: t('converter-page.unit-converter-form-tab'),
    id: 'unit-converter-form',
  },
  {
    title: t('converter-page.number-converter-form-tab'),
    id: 'number-converter-form',
  },
])
const currentTab = ref(tabsList.value[0].id)
</script>

<style lang="scss" scoped>
.converter-page {
  display: flex;
  flex-direction: column;
  gap: toRem(32);
}
</style>
