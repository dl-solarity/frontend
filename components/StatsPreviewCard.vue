<template>
  <div class="stats-preview-card">
    <h2>{{ props.title }}</h2>
    <p class="stats-preview-card__message">
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

.stats-preview-card__message {
  text-transform: uppercase;

  @include p-16-medium;
}
</style>
