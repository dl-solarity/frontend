<template>
  <div class="audits-page">
    <div class="audits-page__title">
      <h2>{{ $t('audits-page.main-title') }}</h2>
      <p class="audits-page__title-secondary">
        {{ $t('audits-page.secondary-title') }}
      </p>
    </div>
    <div class="audits-page__list">
      <audits-card
        v-for="(audit, idx) in audits"
        :key="`${audit.title}-${idx}`"
        :audit="audit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AuditsCard } from '#components'
import { Audit } from '@/types'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const audits: Audit[] = [
  {
    imgSrc: '/img/audits/tornado-proposal.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-1-file-size'),
    title: t('audits-page.audits-card-1-title'),
  },
  {
    imgSrc: '/img/audits/pollendao-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-3-file-size'),
    title: t('audits-page.audits-card-3-title'),
  },
  {
    imgSrc: '/img/audits/nft-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-2-file-size'),
    title: t('audits-page.audits-card-2-title'),
  },
]
</script>

<style lang="scss" scoped>
.audits-page {
  padding: var(--app-padding);
  padding-top: toRem(130);
  max-width: toRem(1800);
  margin: 0 auto;
}

.audits-page__title {
  display: grid;
  gap: toRem(16);
}

.audits-page__title-secondary {
  color: var(--text-primary-main);
}

.audits-page__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: toRem(24);
  margin-top: toRem(40);
  margin-bottom: toRem(110);

  @include respond-to(medium) {
    grid-template-columns: 1fr;
  }
}
</style>
