<template>
  <div class="audits-card">
    <div class="audits-card__img-wrapper">
      <img :src="props.audit.imgSrc" class="audits-card__img" />
    </div>
    <div class="audits-card__content">
      <div class="audits-card__title-wrapper ff-tertiary">
        <p class="audits-card__title">
          {{ props.audit.title }}
        </p>
        <div class="audits-card__circle"></div>
        <p class="audits-card__title">
          {{ props.audit.fileSize }}
        </p>
      </div>
      <p class="audits-card__description">
        {{ props.audit.description }}
      </p>
      <app-button
        class="audits-card__btn"
        color="none"
        scheme="flat"
        modification="border-circle"
        :text="props.audit.btnText || $t('audits-card.download-btn')"
        :icon-right="$icons.download"
        :href="props.audit.fileLink"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Audit } from '@/types'

const props = defineProps<{
  audit: Audit
}>()
</script>

<style lang="scss" scoped>
.audits-card {
  border: toRem(1) solid var(--text-secondary-dark);
  padding: toRem(24);
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.audits-card__img-wrapper {
  position: relative;
  height: 0;
  padding-top: 55%;
}

.audits-card__img {
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0;
  object-fit: cover;
  color: transparent;
}

.audits-card__content {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.audits-card__title-wrapper {
  display: flex;
  align-items: center;
  gap: toRem(8);
}

.audits-card__title {
  font-size: toRem(24);
  line-height: 133%;
}

.audits-card__description {
  line-height: 175%;
  color: var(--text-primary-main);
}

.audits-card__btn {
  align-self: end;
}

.audits-card__circle {
  width: toRem(5);
  height: toRem(5);
  background-color: var(--text-primary-light);
  border-radius: 50%;
}
</style>
