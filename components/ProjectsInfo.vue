<template>
  <div class="projects-info layout-wrapper">
    <projects-info-card
      v-for="(card, idx) in cards"
      :key="idx"
      :title="card.title"
      :message="card.message"
      :btn-text="card.btnText"
      :href="card.href"
      :route="card.route"
    />
  </div>
</template>

<script lang="ts" setup>
import ProjectsInfoCard from './ProjectsInfoCard.vue'
import { config } from '@/config'
import { ROUTE_PATH } from '@/constants'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global
const cards = [
  {
    title: t('projects-info.documentation-title'),
    message: t('projects-info.documentation-message'),
    href: config.DOCUMENTATION_URL,
    btnText: t('projects-info.visit-btn'),
  },
  {
    title: t('projects-info.audits-title'),
    message: t('projects-info.audits-message'),
    route: ROUTE_PATH.audits,
    btnText: t('projects-info.visit-btn'),
  },
  {
    title: t('projects-info.github-title'),
    message: t('projects-info.github-message'),
    href: config.GITHUB_URL,
    btnText: t('projects-info.visit-btn'),
  },
  {
    title: t('projects-info.solidity-tools-title'),
    message: t('projects-info.solidity-tools-message'),
    route: ROUTE_PATH.abi,
    btnText: t('projects-info.visit-btn'),
  },
]
</script>

<style lang="scss" scoped>
.projects-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: toRem(24);
  padding: toRem(104) toRem(96) toRem(62);

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
    padding: var(--app-padding);
    padding-top: toRem(50);
  }
}
</style>
