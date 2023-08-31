<template>
  <transition name="drop-menu">
    <div v-if="isOpen" class="drop-menu" ref="dropMenuElement">
      <template v-if="$slots.default">
        <slot :drop-menu="{ select, close }" />
      </template>
      <template v-else-if="options?.length">
        <app-button
          v-for="(option, idx) in options"
          :key="idx"
          class="drop-menu__option"
          :class="{ 'drop-menu__option--active': modelValue === option.value }"
          scheme="none"
          color="none"
          modification="none"
          @click="select(option.value)"
        >
          {{ option.title }}
        </app-button>
      </template>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { FieldOption } from '@/types'
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption['value']): void
  (event: 'update:is-open', value: boolean): void
}>()

defineProps<{
  modelValue: FieldOption['value']
  options: FieldOption[]
  isOpen: boolean
}>()

const dropMenuElement = ref<HTMLDivElement | null>(null)

const select = (value: FieldOption['value']) => {
  emit('update:model-value', value)
  emit('update:is-open', false)
}

const close = () => {
  emit('update:is-open', false)
}
</script>

<style lang="scss" scoped>
$z-local-index: 1;

.drop-menu {
  position: absolute;
  top: 110%;

  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  width: 100%;
  max-height: 500%;
  z-index: $z-local-index;
  background: var(--field-bg-primary);
  box-shadow: 0 toRem(1) toRem(2) rgba(var(--black-rgb), 0.3),
    0 toRem(2) toRem(6) toRem(2) rgba(var(--black-rgb), 0.15);
  border-radius: var(--border-radius-main);

  &-enter-active {
    animation: drop-menu var(--field-transition-duration);
  }

  &-leave-active {
    animation: drop-menu var(--field-transition-duration) reverse;
  }
}

.drop-menu__option {
  font-family: var(--field-text-font-family);
  font-size: var(--field-text-font-size);
  font-weight: var(--field-text-font-weight);
  line-height: var(--field-text-line-height);
  letter-spacing: var(--field-text-letter-spacing);
  justify-content: start;
  width: 100%;
  padding: var(--field-padding);

  &--active {
    --app-button-bg: var(--app-button-bg-focused);
    --app-button-bg-hover: var(--app-button-bg-focused);
    --app-button-text: var(--app-button-text-focused);
    --app-button-text-hover: var(--app-button-text-focused);
  }
}

@keyframes drop-menu {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
  }
}
</style>
