<template>
  <form class="duration-form">
    <div class="duration-form__input">
      <h3>{{ $t('duration-form.input-title') }}</h3>
      <input-field
        v-model="form.date"
        :label="$t('duration-form.date-label')"
        :placeholder="$t('duration-form.date-placeholder')"
        @blur="touchField('date')"
      />
      <p class="duration-form__text">
        <app-icon class="duration-form__text-icon" :name="ICON_NAMES.clock" />
        {{
          $t('duration-form.info', {
            daysInYear: TIME_CONSTANTS.daysInYear,
            daysInMonth: TIME_CONSTANTS.daysInMonth,
          })
        }}
      </p>
    </div>
    <div class="duration-form__divider" />
    <div class="duration-form__output">
      <h3>{{ $t('duration-form.output-title') }}</h3>
      <div v-for="(item, idx) in outputItems" :key="idx">
        <p class="duration-form__output-item-label">
          {{ item.label }}
        </p>
        <app-copy :value="item.value">
          <p class="duration-form__output-item-value">
            {{ item.value || '–' }}
          </p>
        </app-copy>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { InputField } from '@/fields'
import { computed, reactive, watch } from 'vue'
import { i18n } from '~/plugins/localization'
import {
  getTotalDurationAsSeconds,
  resetRawDate,
  updateRawDate,
} from '@/helpers'
import { ICON_NAMES, TIME_CONSTANTS } from '@/enums'

const { t } = i18n.global

const form = reactive({ date: '' })

const rawDate = reactive({
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  weeks: 0,
  months: 0,
  years: 0,
})

const { touchField } = useFormValidation(form, {})

const outputItems = computed(() => [
  {
    label: t('duration-form.you-put-label'),
    value: pastedValue.value,
  },
  {
    label: t('duration-form.milliseconds-label'),
    value: secondsDuration.value || '',
  },
])

const dateObject = computed(() => {
  const dateObject: Partial<Record<keyof typeof rawDate, number>> = {}
  const dateKeys = Object.keys(rawDate) as (keyof typeof rawDate)[]

  dateKeys.forEach(key => {
    dateObject[key] = rawDate[key]
  })

  return dateObject
})

const pastedValue = computed(() =>
  t('duration-form.pasted-value', dateObject.value),
)

const secondsDuration = computed(() => {
  return getTotalDurationAsSeconds(rawDate)
})

watch(
  () => form.date,
  () => {
    resetRawDate(rawDate)
    updateRawDate(form.date, rawDate)
  },
)
</script>

<style lang="scss" scoped>
.duration-form {
  @include solidity-tools-form;
}

.duration-form__output,
.duration-form__input {
  @include solidity-tools-form-part;
}

.duration-form__divider {
  @include solidity-tools-form-divider;
}

.duration-form__output-item-label {
  @include field-label;
}

.duration-form__output-item-value {
  @include text-ellipsis;
}

.duration-form__text {
  font-size: toRem(14);
  display: flex;
  align-items: center;
  gap: toRem(5);
}

.duration-form__text-icon {
  width: toRem(16);
  height: toRem(16);
  color: var(--primary-main);
}
</style>
