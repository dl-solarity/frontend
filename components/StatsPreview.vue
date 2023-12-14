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
      <div class="stats-preview__btn-wrp">
        <app-button
          class="stats-preview__btn"
          :text="$t('stats-preview.tools-link-text')"
          :route="ROUTE_PATH.abiEncoder"
        />
        <app-button
          class="stats-preview__btn"
          modification="text"
          :text="$t('stats-preview.docs-link-text')"
          :href="config.DOCUMENTATION_URL"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { useViewportSizes } from '@/composables'
import { config } from '@/config'
import { ROUTE_PATH } from '@/constants'

const { isSmallBreakpoint } = useViewportSizes()
</script>

<style lang="scss" scoped>
$z-index: 2;

.stats-preview {
  aspect-ratio: 1512 / 1200;
  display: flex;
  gap: toRem(60);
  width: 100%;
  padding: toRem(90) toRem(96) 0;

  @include respond-to(medium) {
    padding: toRem(32) var(--app-padding-right) 0 var(--app-padding-left);
  }

  @include respond-to(small) {
    aspect-ratio: 375 / 680;
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

    @include respond-to(xsmall) {
      font-size: toRem(26);
      line-height: toRem(42);
      max-width: toRem(250);
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

  @include respond-to(xsmall) {
    max-width: toRem(250);
  }
}

.stats-preview__btn-wrp {
  display: flex;
  gap: toRem(24);
  margin-top: toRem(8);

  @include respond-to(xsmall) {
    flex-direction: column;
  }
}

.stats-preview__btn {
  position: relative;
  z-index: $z-index;
  display: grid;
  min-width: toRem(210);

  @include respond-to(medium) {
    min-width: toRem(170);
  }

  @include respond-to(small) {
    min-width: toRem(120);
  }
}
</style>
