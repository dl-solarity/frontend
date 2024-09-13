<template>
  <div class="ecrecover">
    <h2>{{ $t('ecrecover.main-title') }}</h2>
    <div>
      <app-tabs :tabs="tabsList" />
      <div class="ecrecover__content">
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
  redirect: { name: ROUTE_NAMES.ecrecoverVerify },
})

enum TABS_IDS {
  ecrecoverVerify = 'ecrecover-verify',
}

const { t } = i18n.global
const tabsList = computed<Tab[]>(() => [
  {
    title: t('ecrecover.ecrecover-secp256k1-tab'),
    id: TABS_IDS.ecrecoverVerify,
    route: { name: ROUTE_NAMES.ecrecoverVerify },
  },
])
</script>

<style lang="scss" scoped>
.ecrecover {
  @include solidity-tools-page-base;
}

.ecrecover__content {
  @include solidity-tools-page-content;
}
</style>
