<template>
  <transition name="drop-item">
    <div v-if="isOpen" class="drop-menu">
      <div ref="dropMenuWrpElement" class="drop-menu__wrp">
        <template v-if="$slots.default">
          <slot :drop-menu="{ select, close }" />
        </template>
        <template v-else-if="options?.length">
          <app-button
            v-for="(option, idx) in options"
            :key="idx"
            class="drop-menu__option"
            :class="{
              'drop-menu__option--active': modelValue === option.value,
              'drop-menu__option--nav': navOptionIdx === idx,
            }"
            scheme="none"
            color="none"
            modification="none"
            @click="select(option.value)"
            @pointermove="emit('update:nav-option-idx', idx)"
          >
            {{ option.title }}
          </app-button>
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { FieldOption } from '@/types'
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (event: 'update:model-value', value: FieldOption['value']): void
  (event: 'update:is-open', value: boolean): void
  (event: 'update:nav-option-idx', value: number): void
}>()

const props = withDefaults(
  defineProps<{
    modelValue: FieldOption['value']
    options: FieldOption[]
    isOpen: boolean
    navOptionIdx?: number
  }>(),
  {
    navOptionIdx: 0,
  },
)

const dropMenuWrpElement = ref<HTMLDivElement | null>(null)

const select = (value: FieldOption['value']) => {
  emit('update:model-value', value)
  emit('update:is-open', false)
}

const close = () => {
  emit('update:is-open', false)
}

// reset navOptionIdx on open
watch(
  () => props.isOpen,
  newValue => {
    if (newValue) {
      const modelValueIdx = props.options.findIndex(
        option => option.value === props.modelValue,
      )

      emit('update:nav-option-idx', modelValueIdx !== -1 ? modelValueIdx : 0)
    }
  },
)

// scroll to element with navOptionIdx
watch([() => props.navOptionIdx, dropMenuWrpElement], () => {
  if (!dropMenuWrpElement.value?.children.length) return

  dropMenuWrpElement.value.children[props.navOptionIdx].scrollIntoView({
    block: 'nearest',
  })
})
</script>

<style lang="scss" scoped>
$z-local-index: 10;

.drop-menu {
  position: absolute;
  top: 110%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-height: 500%;
  z-index: $z-local-index;
  border-radius: var(--border-radius-main);

  @include drop-item-shadow;
}

.drop-menu__wrp {
  overflow: auto;
  background: var(--field-bg-primary);
}

.drop-menu .drop-menu__option {
  font-family: var(--field-text-font-family);
  font-size: var(--field-text-font-size);
  font-weight: var(--field-text-font-weight);
  line-height: var(--field-text-line-height);
  letter-spacing: var(--field-text-letter-spacing);
  justify-content: start;
  width: 100%;
  padding: var(--field-padding);
  transition: none;

  &--nav {
    --app-button-text: var(--app-button-text-hover);
    --app-button-bg: var(--app-button-bg-hover);
  }

  &:not(.drop-menu__option--nav) {
    --app-button-text-hover: var(--app-button-text);
    --app-button-bg-hover: var(--app-button-bg);
  }

  &--active {
    --app-button-bg: var(--app-button-bg-focused);
    --app-button-bg-hover: var(--app-button-bg-focused);
    --app-button-text: var(--app-button-text-focused);
    --app-button-text-hover: var(--app-button-text-focused);
  }
}

@include drop-item-transition;
</style>
