<template>
  <div class="projects-info layout-wrapper">
    <projects-info-card v-for="(card, idx) in cards" :key="idx" :card="card" />
  </div>
</template>

<script lang="ts" setup>
import ProjectsInfoCard from './ProjectsInfoCard.vue'
import { config } from '@/config'
import { ROUTE_PATH } from '@/constants'
import { ProjectInfoCard } from '@/types'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global
const cards: ProjectInfoCard[] = [
  {
    title: t('projects-info.documentation-title'),
    message: t('projects-info.documentation-message'),
    btnText: t('projects-info.visit-btn'),
    href: config.DOCUMENTATION_URL,
  },
  {
    title: t('projects-info.audits-title'),
    message: t('projects-info.audits-message'),
    btnText: t('projects-info.visit-btn'),
    route: ROUTE_PATH.audits,
  },
  {
    title: t('projects-info.github-title'),
    message: t('projects-info.github-message'),
    btnText: t('projects-info.visit-btn'),
    href: config.GITHUB_URL,
  },
  {
    title: t('projects-info.solidity-tools-title'),
    message: t('projects-info.solidity-tools-message'),
    btnText: t('projects-info.visit-btn'),
    route: ROUTE_PATH.abiEncoder,
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
