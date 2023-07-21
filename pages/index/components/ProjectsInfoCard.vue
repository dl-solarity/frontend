<template>
  <div class="projects-info-card">
    <p class="projects-info-card__title ff-tertiary">
      {{ props.title }}
    </p>
    <p class="projects-info-card__message ff-secondary">
      {{ props.message }}
    </p>
    <app-button
      scheme="flat"
      modification="border-circle"
      :text="btnText"
      :icon-right="$icons.arrowRight"
      :route="props.route"
      :href="props.href"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'

const props = withDefaults(
  defineProps<{
    title: string
    message: string
    btnText: string
    href?: string
    route?: string
  }>(),
  {
    href: '',
    route: '',
  },
)
</script>

<style scoped lang="scss">
.projects-info-card {
  display: flex;
  flex-direction: column;
  padding: toRem(32);
  border-radius: toRem(8);
  background: var(--text-secondary-dark);
}

.projects-info-card__title {
  font-size: toRem(32);
  margin-bottom: toRem(12);
  font-weight: 500;
  line-height: 125%;
}

.projects-info-card__message {
  font-size: toRem(18);
  margin-bottom: toRem(24);
  font-weight: 400;
  line-height: 175%;
  color: var(--text-primary-main);
}
</style>
