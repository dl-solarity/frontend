<template>
  <main class="audits-page">
    <h2>{{ $t('audits-page.main-title') }}</h2>
    <p class="audits-page__title-secondary">
      {{ $t('audits-page.secondary-title') }}
    </p>
    <div class="audits-page__list">
      <audits-card v-for="(audit, idx) in audits" :key="idx" :audit="audit" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AuditsCard } from '#components'
import { Audit } from '@/types'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const audits: Audit[] = [
  {
    imgSrc: '/img/audits/tornado-proposal.png',
    fileLink:
      'https://github.com/dl-solarity/audits/raw/3b1014e3580691f62eea2e22be096ce34a868542/TornadoCash/TornadoCash_diversification_proposal.pdf',
    fileSize: t('audits-page.audits-card-1-file-size'),
    title: t('audits-page.audits-card-1-title'),
  },
  {
    imgSrc: '/img/audits/pollendao-reaudit.png',
    fileLink:
      'https://github.com/dl-solarity/audits/raw/3b1014e3580691f62eea2e22be096ce34a868542/PollenDAO/PollenDAO.pdf',
    fileSize: t('audits-page.audits-card-3-file-size'),
    title: t('audits-page.audits-card-3-title'),
  },
  {
    imgSrc: '/img/audits/nft-reaudit.png',
    fileLink:
      'https://github.com/dl-solarity/audits/raw/3b1014e3580691f62eea2e22be096ce34a868542/NFTxCards/NFTxCards.pdf',
    fileSize: t('audits-page.audits-card-2-file-size'),
    title: t('audits-page.audits-card-2-title'),
  },
]
</script>

<style lang="scss" scoped>
.audits-page {
  background: var(--background-secondary-main);
  padding-right: toRem(80);
  padding-left: toRem(80);

  @include respond-to(medium) {
    padding-right: var(--app-padding-right);
    padding-left: var(--app-padding-left);
  }
}

.audits-page__title-secondary {
  margin-top: toRem(16);
  color: var(--text-primary-main);
}

.audits-page__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: toRem(24);
  margin-top: toRem(24);

  @include respond-to(medium) {
    grid-template-columns: 1fr;
    gap: toRem(16);
  }
}
</style>
