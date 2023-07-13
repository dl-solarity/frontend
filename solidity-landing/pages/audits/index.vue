<template>
  <div class="audits">
    <div class="audits__title">
      <h1 class="audits__title-main fs-secondary">
        {{ $t('audits.main-title') }}
      </h1>
      <h2 class="audits__title-secondary">
        {{ $t('audits.secondary-title') }}
      </h2>
    </div>
    <div class="audits__list">
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const auditsList = [
  {
    imgSrc: '/assets/img/audits/tornado-proposal.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits.audits-card-1-file-size'),
    title: t('audits.audits-card-1-title'),
    description: t('audits.audits-card-1-description'),
  },
  {
    imgSrc: '/assets/img/audits/nft-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits.audits-card-2-file-size'),
    title: t('audits.audits-card-2-title'),
    description: t('audits.audits-card-2-description'),
  },
  {
    imgSrc: '/assets/img/audits/pollendao-reaudit.png',
    fileLink: 'https://github.com/dl-solidity-library/docs',
    fileSize: t('audits.audits-card-3-file-size'),
    title: t('audits.audits-card-3-title'),
    description: t('audits.audits-card-3-description'),
  },
]
</script>

<style lang="scss" scoped>
.audits {
  padding: var(--app-padding);
  padding-top: toRem(130);
  max-width: toRem(1800);
  margin: 0 auto;
}

.audits__title {
  display: grid;
  gap: toRem(16);
}

.audits__title-main {
  font-size: toRem(40);
  font-weight: 600;
  line-height: 120%;
  color: var(--text-primary-main);
}

.audits__title-secondary {
  font-size: toRem(18);
  line-height: 175%;
  font-weight: 400;
  color: var(--text-secondary-main);
}

.audits__list {
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
