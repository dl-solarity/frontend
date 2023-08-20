<template>
  <div class="stats-preview">
    <div class="stats-preview__header">
      <h1 class="stats-preview__header-main-title">
        {{ t('stats-preview.main-title') }}
      </h1>
      <p class="stats-preview__header-secondary-title">
        {{ t('stats-preview.secondary-title') }}
      </p>
    </div>

    <div class="stats-preview__cards">
      <stats-preview-card
        v-for="(card, idx) in cards"
        :key="idx"
        :title="card.title"
        :message="card.message"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import StatsPreviewCard from './StatsPreviewCard.vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const cards = [
  {
    title: t('stats-preview.stats-card-1-title'),
    message: t('stats-preview.stats-card-1-message'),
  },
  {
    title: t('stats-preview.stats-card-2-title'),
    message: t('stats-preview.stats-card-2-message'),
  },
  {
    title: t('stats-preview.stats-card-3-title'),
    message: t('stats-preview.stats-card-3-message'),
  },
]
</script>

<style lang="scss" scoped>
.stats-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: toRem(60);
  background-image: url('/branding/bg.png');
  background-size: 100% 100%;
  width: 100%;
  min-height: vh(100);
  padding: toRem(204) toRem(96) toRem(80);

  @include respond-to(tablet) {
    padding: var(--app-padding);
    padding-top: toRem(100);
  }
}

.stats-preview__header {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
}

.stats-preview__header-main-title {
  max-width: toRem(940);
}

.stats-preview__header-secondary-title {
  max-width: toRem(440);
  color: var(--text-primary-main);
}

.stats-preview__cards {
  display: flex;
  gap: toRem(90);

  @include respond-to(tablet) {
    flex-direction: column;
    gap: toRem(20);
  }
}
</style>
