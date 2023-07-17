<template>
  <div class="tabs">
    <button
      v-for="item in tabs"
      class="tabs__btn"
      :key="item.id"
      :class="{ 'tabs__btn--active': modelValue === item.id }"
      @click="updateTab(item.id)"
    >
      <icon class="tabs__btn-icon" :name="$icons.cube" />
      <p class="tabs__btn-text">
        {{ item.title }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/common'

type TabsType = {
  title: string
  id: string
}

defineProps<{
  modelValue: string
  tabs: TabsType[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const updateTab = (id: string) => {
  emit('update:modelValue', id)
}
</script>

<style lang="scss" scoped>
.tabs {
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: toRem(15);
  border-radius: toRem(8) toRem(8) 0 0;
  background: var(--background-primary-dark);

  ::-webkit-scrollbar-thumb {
    height: toRem(2);
  }
}

.tabs__btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: toRem(16) toRem(32);
  gap: toRem(8);

  &:hover {
    background: var(--background-primary-dark);

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
