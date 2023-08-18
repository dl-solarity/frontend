<template>
  <div class="audits-page">
    <div class="audits-page__title">
      <h1 class="audits-page__title-main ff-tertiary">
        {{ $t('audits-page.main-title') }}
      </h1>
      <h2 class="audits-page__title-secondary ff-secondary">
        {{ $t('audits-page.secondary-title') }}
      </h2>
    </div>
    <div class="audits-page__list">
      <audits-card
        v-for="(card, indx) in auditsList"
        :key="indx"
        :audit="card"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuditsCard from './components/AuditsCard.vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const auditsList = [
  {
    imgSrc: '/img/audits/tornado-proposal.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-1-file-size'),
    title: t('audits-page.audits-card-1-title'),
    description: t('audits-page.audits-card-1-description'),
  },
  {
    imgSrc: '/img/audits/pollendao-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-3-file-size'),
    title: t('audits-page.audits-card-3-title'),
    description: t('audits-page.audits-card-3-description'),
  },
  {
    imgSrc: '/img/audits/nft-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits-page.audits-card-2-file-size'),
    title: t('audits-page.audits-card-2-title'),
    description: t('audits-page.audits-card-2-description'),
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

.audits-page__title-main {
  font-size: toRem(40);
  font-weight: 600;
  line-height: 120%;
  color: var(--text-primary-light);
}

.audits-page__title-secondary {
  font-size: toRem(18);
  line-height: 175%;
  font-weight: 400;
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
