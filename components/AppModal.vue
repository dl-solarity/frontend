<template>
  <teleport to="#app-modals">
    <transition name="app-modal" appear>
      <div
        v-if="isResettable ? isShown : true"
        v-show="!isResettable ? isShown : true"
        class="app-modal"
        tabindex="0"
        role="button"
        ref="modalBackdropElement"
        @click="onBackdropClick"
      >
        <div class="app-modal__pane" v-bind="$attrs">
          <slot :close="closeModal" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'update:is-shown', value: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    isShown?: boolean
    isCloseByClickOutside?: boolean
    isResettable?: boolean
  }>(),
  {
    isShown: false,
    isCloseByClickOutside: true,
    isResettable: true,
  },
)

const modalBackdropElement = ref<HTMLDivElement | undefined>()

const closeModal = () => {
  emit('update:is-shown', false)
}

const onBackdropClick = (event: Event) => {
  if (
    props.isCloseByClickOutside &&
    event.target === modalBackdropElement.value
  ) {
    closeModal()
    event.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
$z-index: 1300;

.app-modal {
  display: flex;
  position: fixed;
  inset: 0;
  z-index: $z-index;
  height: vh(100);
  width: 100%;
  background: var(--backdrop-modal);
  overflow-y: auto;
  padding: var(--app-padding);

  &-enter-active,
  &-leave-active {
    $timing: var(--transition-timing-default);

    transition: var(--transition-duration-fast) $timing;
    transition-property: opacity, transform;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
}

.app-modal__pane {
  position: relative;
  margin: auto;
  flex-shrink: 0;
}
</style>
