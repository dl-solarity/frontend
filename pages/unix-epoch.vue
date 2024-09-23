<template>
  <div class="unix-epoch-page">
    <h2>{{ $t('unix-epoch-page.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabItems" />
      <div class="unix-epoch-page__content">
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
  redirect: { name: ROUTE_NAMES.unixEpochDate },
})

enum TAB_IDS {
  date = 'date',
  timestamp = 'timestamp',
  duration = 'duration',
}

const { t } = i18n.global
const tabItems = computed<Tab[]>(() => [
  {
    title: t('unix-epoch-page.date-form-tab'),
    id: TAB_IDS.date,
    route: { name: ROUTE_NAMES.unixEpochDate },
  },
  {
    title: t('unix-epoch-page.timestamp-form-tab'),
    id: TAB_IDS.timestamp,
    route: { name: ROUTE_NAMES.unixEpochTimestamp },
  },
  {
    title: t('unix-epoch-page.duration-form-tab'),
    id: TAB_IDS.duration,
    route: { name: ROUTE_NAMES.unixEpochDuration },
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
