<template>
  <div class="app-tabs">
    <app-button
      v-for="tab in tabs"
      :key="tab.id"
      :text="tab.title"
      :icon-left="$icons.cube"
      color="secondary"
      scheme="none"
      modification="none"
      class="app-tabs__btn"
      :class="{ 'app-tabs__btn--active': modelValue.id === tab.id }"
      @click="updateTab(tab)"
    />
  </div>
</template>

<script setup lang="ts">
import { AppButton } from '#components'
import { Tab } from '@/types'

defineProps<{
  modelValue: Tab
  tabs: Tab[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Tab): void
}>()

const updateTab = (tab: Tab) => {
  emit('update:modelValue', tab)
}
</script>

<style lang="scss" scoped>
.app-tabs {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: var(--border-radius-main) var(--border-radius-main) 0 0;
  background: var(--background-primary-light);

  .app-tabs__btn {
    grid-auto-flow: row;
    justify-items: center;
    padding: toRem(16) toRem(32);
    transition: none;
    --app-button-bg-focused: var(--primary-main);
    --app-button-bg-active: var(--primary-main);
    --app-button-text-hover: var(--primary-main);
    --app-button-text-focused: var(--text-primary-invert-main);
    --app-button-text-active: var(--text-primary-invert-main);

    &--active {
      --app-button-bg: var(--primary-main);
      --app-button-bg-hover: var(--primary-main);
      --app-button-bg-focused: var(--primary-main);
      --app-button-bg-active: var(--primary-main);
      --app-button-text: var(--text-primary-invert-main);
      --app-button-text-hover: var(--text-primary-invert-main);
      --app-button-text-focused: var(--text-primary-invert-main);
      --app-button-text-active: var(--text-primary-invert-main);
    }
  }
}
</style>
