<template>
  <div class="constants">
    <h2>{{ $t('constants.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabItems" />
      <div class="constants__content">
        <nuxt-page keepalive />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports'
import { ROUTE_NAMES } from '@/enums'
import { i18n } from '~/plugins/localization'
import { type Tab } from '@/types'
import { computed } from 'vue'

definePageMeta({
  layout: 'solidity-tools',
  redirect: { name: ROUTE_NAMES.constantsBytes },
})

enum TAB_IDS {
  constantsBytes = 'constants-bytes',
}

const { t } = i18n.global
const tabItems = computed<Tab[]>(() => [
  {
    title: t('constants.constants-bytes-tab'),
    id: TAB_IDS.constantsBytes,
    route: { name: ROUTE_NAMES.constantsBytes },
  },
])
</script>

<style lang="scss" scoped>
.constants {
  @include solidity-tools-page-base;
}

.constants__content {
  @include solidity-tools-page-content;
}
</style>
