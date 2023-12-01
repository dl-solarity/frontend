<template>
  <div class="audits-card">
    <app-image :src="audit.imgSrc" class="audits-card__img" alt="audit-image" />
    <div class="audits-card__content">
      <div class="audits-card__title-wrp">
        <h3 class="audits-card__title">
          {{ audit.title }}
        </h3>
        <div class="audits-card__circle" />
        <h3>{{ audit.fileSize }}</h3>
      </div>
      <app-button
        class="audits-card__btn"
        color="none"
        scheme="flat"
        modification="border-circle"
        download
        :text="audit.btnText || $t('audits-card.download-btn')"
        :icon-right="$icons.download"
        :href="audit.fileLink"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppImage } from '#components'
import { Audit } from '@/types'

defineProps<{
  audit: Audit
}>()
</script>

<style lang="scss" scoped>
.audits-card {
  background: var(--background-primary-dark);
  padding: toRem(24);
  display: flex;
  flex-direction: column;
  gap: toRem(16);
  border-radius: var(--border-radius-main);
}

.audits-card__img {
  aspect-ratio: 600 / 318;
  width: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.audits-card__content {
  display: flex;
  gap: toRem(16);

  @include respond-to(xsmall) {
    flex-direction: column;
  }
}

.audits-card__title-wrp {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: toRem(8);
  max-width: max-content;
}

.audits-card__title {
  @include text-ellipsis;
}

.audits-card__circle {
  width: toRem(5);
  height: toRem(5);
  background-color: var(--text-primary-light);
  border-radius: 50%;
}

.audits-card__btn {
  margin-left: auto;
}
</style>
