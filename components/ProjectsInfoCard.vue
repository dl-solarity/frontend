<template>
  <div class="projects-info-card">
    <h3>{{ card.title }}</h3>
    <p class="projects-info-card__message">
      {{ card.message }}
    </p>
    <app-button
      color="none"
      scheme="flat"
      modification="border-circle"
      :text="card.btnText"
      :icon-right="$icons.arrowRightUp"
      :route="card.route"
      :href="card.href"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { ProjectInfoCard } from '@/types'

defineProps<{
  card: ProjectInfoCard
}>()
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
