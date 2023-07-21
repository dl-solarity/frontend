<template>
  <div class="stats-preview-card">
    <p class="stats-preview-card__title ff-tertiary">
      {{ props.title }}
    </p>
    <p class="stats-preview-card__message ff-secondary">
      {{ props.message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
  message: string
}>()
</script>

<style lang="scss" scoped>
.stats-preview-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: toRem(8);
}

.stats-preview-card__title {
  font-size: toRem(40);
  font-weight: 600;
  line-height: 120%;
}

.stats-preview-card__message {
  font-size: toRem(18);
  font-weight: 500;
  line-height: 175%;
  letter-spacing: toRem(0.36);
  text-transform: uppercase;
}
</style>
