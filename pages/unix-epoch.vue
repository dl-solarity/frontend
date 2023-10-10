<template>
  <div class="unix-epoch-page">
    <h2>{{ $t('unix-epoch-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="unix-epoch-page__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppTabs } from '#components'
import { definePageMeta } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { type Tab } from '@/types'
import { computed } from 'vue'
import { i18n } from '~/plugins/localization'

definePageMeta({
  layout: 'solidity-tools',
  redirect: ROUTE_PATH.unixEpochDate,
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
    route: ROUTE_PATH.unixEpochDate,
  },
  {
    title: t('unix-epoch-page.timestamp-form-tab'),
    id: TABS_IDS.timestamp,
    route: ROUTE_PATH.unixEpochTimestamp,
  },
])
</script>

<style lang="scss" scoped>
.unix-epoch-page {
  @include solidity-tools-page-base;
}

.unix-epoch-page__content {
  // to avoid a UI bug on scroll when calendar is opening
  margin-bottom: toRem(104);

  @include solidity-tools-page-content;
}
</style>
