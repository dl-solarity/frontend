<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      class="tabs__btn"
      :key="tab.id"
      :class="{ 'tabs__btn--active': modelValue.id === tab.id }"
      @click="updateTab(tab)"
    >
      <icon class="tabs__btn-icon" :name="$icons.cube" />
      <p class="tabs__btn-text">
        {{ tab.title }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components'
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
.tabs {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: toRem(8) toRem(8) 0 0;
  background: var(--background-primary-light);

  ::-webkit-scrollbar-thumb {
    height: toRem(2);
  }
}

.tabs__btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: toRem(16) toRem(32);
  gap: toRem(8);

  &:hover {
    .tabs__btn-icon,
    .tabs__btn-text {
      color: var(--text-primary-main);
    }
  }

  &--active:hover,
  &--active {
    background: var(--primary-main);

    .tabs__btn-icon,
    .tabs__btn-text {
      color: var(--text-primary-invert-main);
    }
  }
}

.tabs__btn-icon {
  width: toRem(22);
  color: var(--text-primary-dark);
  height: toRem(22);
}

.tabs__btn-text {
  font-weight: 600;
  font-size: toRem(14);
  white-space: nowrap;
  color: var(--text-primary-dark);
}
</style>
