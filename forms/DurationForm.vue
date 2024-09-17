<template>
  <form class="duration-form">
    <div class="duration-form__input">
      <h3>{{ $t('duration-form.input-title') }}</h3>
      <input-field
        v-model="form.duration"
        :label="$t('duration-form.duration-label')"
        :placeholder="$t('duration-form.duration-placeholder')"
        @blur="touchField('duration')"
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
import { getTotalDurationAsSeconds, getTransformedTime } from '@/helpers'
import { ICON_NAMES, TIME_CONSTANTS } from '@/enums'
import { Time } from 'types/time.types'

const INITIAL_RAW_DURATION_STATE: Time = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  weeks: 0,
  months: 0,
  years: 0,
}

const { t } = i18n.global

const form = reactive({ duration: '' })

const rawDuration = reactive<Time>({ ...INITIAL_RAW_DURATION_STATE })

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

const pastedValue = computed(() => t('duration-form.pasted-value', rawDuration))

const secondsDuration = computed(() => {
  return getTotalDurationAsSeconds(rawDuration)
})

watch(
  () => form.duration,
  () => {
    Object.assign(rawDuration, getTransformedTime(form.duration))
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
