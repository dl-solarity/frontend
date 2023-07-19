<template>
  <div class="projects-info layout-wrapper">
    <projects-info-card
      v-for="(card, idx) in infoCards"
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
import { useI18n } from 'vue-i18n'
import { ROUTE_PATH } from '@/constants'

const { t } = useI18n({ useScope: 'global' })
const infoCards = [
  {
    title: t('projects-info.documentation-title'),
    message: t('projects-info.documentation-message'),
    href: 'https://docs.google.com/',
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
    href: 'https://github.com/dl-solidity-library',
    btnText: t('projects-info.visit-btn'),
  },
  {
    title: t('projects-info.solidity-tools-title'),
    message: t('projects-info.solidity-tools-message'),
    href: 'https://github.com/dl-solidity-library/frontend/tree/master/web-solidity-tools',
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
