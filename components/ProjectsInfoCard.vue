<template>
  <div class="projects-info-card">
    <h3>{{ props.title }}</h3>
    <p class="projects-info-card__message">
      {{ props.message }}
    </p>
    <app-button
      color="none"
      scheme="flat"
      modification="border-circle"
      :text="btnText"
      :icon-right="$icons.arrowRightUp"
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
  padding: toRem(32);
  border-radius: var(--border-radius-main);
  background: var(--background-primary-light);
}

.projects-info-card__message {
  margin-top: toRem(12);
  margin-bottom: toRem(24);
  color: var(--text-primary-main);
}
</style>
