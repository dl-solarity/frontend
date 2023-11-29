<template>
  <div class="stats-preview">
    <div class="stats-preview__header">
      <div class="stats-preview__header-main-title-wrp">
        <h1 class="stats-preview__header-main-title">
          {{ $t('stats-preview.main-title-part-1') }}
        </h1>
        <h1 class="stats-preview__header-main-title">
          {{
            !isSmallBreakpoint
              ? $t('stats-preview.main-title-part-2')
              : $t('stats-preview.main-title-part-2--short')
          }}
        </h1>
      </div>
      <p class="stats-preview__header-secondary-title">
        {{ $t('stats-preview.secondary-title') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useViewportSizes } from '@/composables'
const { isSmallBreakpoint } = useViewportSizes()
</script>

<style lang="scss" scoped>
$z-index: 2;

.stats-preview {
  aspect-ratio: 1512 / 1126;
  display: flex;
  gap: toRem(60);
  width: 100%;
  padding: var(--app-padding-top) toRem(96) 0;

  @include respond-to(medium) {
    padding-right: var(--app-padding-right);
    padding-left: var(--app-padding-left);
  }

  @include respond-to(small) {
    aspect-ratio: 375 / 658;
  }
}

.stats-preview__header {
  display: flex;
  flex-direction: column;
  gap: toRem(16);

  @include respond-to(medium) {
    gap: toRem(8);
  }
}

.stats-preview__header-main-title-wrp {
  max-width: toRem(1024);

  @include respond-to(medium) {
    max-width: toRem(600);
  }
}

.stats-preview__header-main-title {
  position: relative;
  z-index: $z-index;
  display: inline;

  &:first-child {
    color: var(--primary-main);
  }

  &:last-child {
    @include respond-to(small) {
      font-size: toRem(38);
      max-width: toRem(375);
    }
  }

  @include respond-to(small) {
    display: block;
  }
}

.stats-preview__header-secondary-title {
  position: relative;
  z-index: $z-index;
  max-width: max-content;

  @include respond-to(small) {
    font-size: toRem(14);
  }
}
</style>
