<template>
  <div
    ref="dataFieldElement"
    class="datetime-field"
    :class="{ 'datetime-field--open': isOpen }"
  >
    <div class="datetime-field__wrp">
      <button
        ref="btnElement"
        v-bind="$attrs"
        class="datetime-field__btn"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <app-icon class="datetime-field__icon" :name="$icons.calendar" />
      </button>

      <template v-if="isSmallBreakpoint">
        <app-modal
          :is-shown="isOpen"
          :is-close-by-click-outside="false"
          :is-resettable="false"
        >
          <div
            ref="flatpickrWrpElement"
            class="datetime-field__flatpickr-wrp"
          />
        </app-modal>
      </template>
      <template v-else>
        <transition name="drop-item" @after-enter="scrollToFlatpickr">
          <div
            v-show="isOpen"
            ref="flatpickrWrpElement"
            class="datetime-field__flatpickr-wrp"
          />
        </transition>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppIcon, AppModal } from '#components'
import { useViewportSizes } from '@/composables'
import { onClickOutside } from '@vueuse/core'
import { default as createFlatpickr } from 'flatpickr'
import { nextTick, ref, watch } from 'vue'
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance'
import type { Options } from 'flatpickr/dist/types/options'
import arrowIconHTML from '@/assets/icons/arrow-drop-down-icon.svg?raw'

const emit = defineEmits<{
  (event: 'update:model-value', value: number): void
}>()

const props = defineProps<{
  /** Unix timestamp (seconds) */
  modelValue: number
}>()

const { isSmallBreakpoint } = useViewportSizes()

const dataFieldElement = ref<HTMLDivElement | null>(null)
const btnElement = ref<HTMLInputElement | null>(null)
const flatpickrWrpElement = ref<HTMLDivElement | null>(null)
const flatpickrInstance = ref<FlatpickrInstance | null>(null)
const isOpen = ref(false)

let _unsubscribeFromClickOutside: (() => void) | undefined
const initFlatpickr = (): void => {
  if (
    !dataFieldElement.value ||
    !btnElement.value ||
    !flatpickrWrpElement.value
  ) {
    flatpickrInstance.value?.destroy()
    return
  }

  const options: Options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    disableMobile: true,

    /** Date object with less than this min date works incorrectly */
    minDate: new Date('05/02/1924'),

    defaultHour: 0,
    locale: { firstDayOfWeek: 1 },
    monthSelectorType: 'static',
    minuteIncrement: 1,
    defaultDate: props.modelValue * 1000,
    clickOpens: false,
    appendTo: flatpickrWrpElement.value,
    prevArrow: arrowIconHTML,
    nextArrow: arrowIconHTML,
    onChange: dates => {
      if (!dates.length) return
      emit('update:model-value', dates[0].getTime() / 1000)
    },
  }

  flatpickrInstance.value = createFlatpickr(btnElement.value, options)

  nextTick(() => {
    if (!flatpickrWrpElement.value) return

    _unsubscribeFromClickOutside?.()
    _unsubscribeFromClickOutside = onClickOutside(
      flatpickrWrpElement.value.children[0] as HTMLDivElement,
      () => {
        isOpen.value = false
      },
      { ignore: [btnElement] },
    )
  })
}

const updateFlatpickrDate = (timestamp: number): void => {
  flatpickrInstance.value?.setDate(timestamp.toString(), false, 'U')
}

const scrollToFlatpickr = (): void => {
  if (isOpen.value && flatpickrWrpElement.value) {
    flatpickrWrpElement.value.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }
}

watch(() => props.modelValue, updateFlatpickrDate)

watch([dataFieldElement, btnElement, flatpickrWrpElement], initFlatpickr)
</script>

<style lang="scss">
@import 'assets/styles/flatpickr';

$z-index-btn: 1;

.datetime-field {
  border-radius: var(--border-radius-main);
  background: var(--background-primary-dark);
}

.datetime-field__wrp {
  position: relative;
  padding: toRem(4);
}

.datetime-field__icon {
  height: 1.6em;
  width: 1.6em;
}

.datetime-field__btn {
  position: relative;
  z-index: $z-index-btn;
  display: flex;
  justify-content: center;
  border-radius: var(--border-radius-main);
  color: var(--text-primary-main);
  padding: toRem(8) toRem(16);
  transition: var(--transition-duration-fast) var(--transition-timing-default);
  transition-property: background-color, color;
  width: 100%;

  &[disabled] {
    cursor: not-allowed;
  }

  &:not([disabled]) {
    &:hover {
      background: var(--background-primary-light);
    }

    .datetime-field--open &,
    &:focus,
    &:active {
      background: var(--background-primary-light);
      color: var(--primary-main);
    }
  }
}

.datetime-field__flatpickr-wrp {
  position: absolute;
  top: 110%;
  right: 0;
  padding-bottom: var(--app-padding-bottom);

  @include respond-to(small) {
    position: static;
  }
}

@include drop-item-transition;
</style>
