<template>
  <div class="datetime-field">
    <button ref="element" v-bind="$attrs" class="datetime-field__btn">
      <app-icon class="datetime-field__icon" :name="$icons.calendar" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { AppIcon } from '#components'
import { default as createFlatpickr } from 'flatpickr'
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

const element = ref<HTMLInputElement | null>(null)
const flatpickrInstance = ref<FlatpickrInstance | null>(null)

onMounted(() => {
  if (!element.value) return

  const options: Options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    minDate: new Date('05/02/1924'),
    defaultHour: 0,
    locale: { firstDayOfWeek: 1 },
    monthSelectorType: 'static',
    minuteIncrement: 1,
    defaultDate: props.modelValue * 1000,
    static: true,
    prevArrow: arrowIconHTML,
    nextArrow: arrowIconHTML,
    onChange: dates => {
      if (!dates.length) return
      emit('update:model-value', dates[0].getTime() / 1000)
    },
  }

  flatpickrInstance.value = createFlatpickr(element.value, options)
})

onBeforeUnmount(() => {
  flatpickrInstance.value?.destroy()
})

watch(
  () => props.modelValue,
  newValue => {
    flatpickrInstance.value?.setDate(newValue.toString(), false, 'U')
  },
)
</script>

<style lang="scss">
@import 'assets/styles/flatpickr';

.datetime-field {
  border-radius: var(--border-radius-main);
  background: var(--background-primary-dark);
}

.datetime-field__icon {
  height: 1.6em;
  width: 1.6em;
}

.datetime-field__btn {
  display: flex;
  justify-content: center;
  border-radius: inherit;
  color: var(--text-primary-main);
  padding: toRem(8) toRem(16);
  transition: var(--field-transition-duration);
  transition-property: background-color, color;
  width: 100%;

  &[disabled] {
    cursor: not-allowed;
  }

  &:not([disabled]) {
    &:hover {
      background: var(--background-primary-light);
    }

    &:focus,
    &:active {
      background: var(--background-primary-light);
      color: var(--primary-main);
    }
  }
}
</style>
