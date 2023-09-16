<template>
  <form class="date-form" @submit.prevent>
    <div class="date-form__input">
      <h3>{{ $t('date-form.input-title') }}</h3>
      <div class="date-form__input-fields">
        <input-field
          v-for="(_, key) in form"
          :key="key"
          v-model="form[key]"
          :label="$t(`date-form.${key}-label`)"
          :placeholder="$t(`date-form.${key}-placeholder`)"
          :error-message="getFieldErrorMessage(key)"
          @blur="touchField(key)"
        />
      </div>
      <datetime-field
        :model-value="datetimeFieldTimestamp"
        @update:model-value="setForm($event)"
      />
    </div>
    <div class="date-form__output">
      <h3>{{ $t('date-form.output-title') }}</h3>
      <div v-for="(item, idx) in outputItems" :key="idx">
        <p class="date-form__output-item-label">
          {{ item.label }}
        </p>
        <app-copy :value="item.value">
          <p class="date-form__output-item-value">
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
import { DatetimeField, InputField } from '@/fields'
import { integer, maxValue, minValue, required } from '@/helpers'
import { Time, type TimeDate } from '@distributedlab/tools'
import { computed, reactive } from 'vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const form = reactive({
  year: '',
  month: '',
  day: '',
  hour: '',
  minute: '',
  second: '',
})

const maxDayInMonth = computed<number>(() => {
  const year = Number(form.year)
  const month = Number(form.month) - 1

  if (!year && !month) return 31
  return new Time(new Date(year, month)).dayjs.daysInMonth()
})

const rules = computed(() => ({
  year: {
    required,
    integer,
    minValue: minValue(1924),
    maxValue: maxValue(10000),
  },
  month: {
    required,
    integer,
    minValue: {
      /** Date object with month of 1924 before May works incorrectly */
      ...(form.year === '1924' ? minValue(5) : minValue(1)),
    },
    maxValue: maxValue(12),
  },
  day: {
    required,
    integer,
    minValue: minValue(1),
    maxValue: maxValue(maxDayInMonth.value),
  },
  hour: { required, integer, minValue: minValue(0), maxValue: maxValue(23) },
  minute: {
    required,
    integer,
    minValue: minValue(0),
    maxValue: maxValue(59),
  },
  second: {
    required,
    integer,
    minValue: minValue(0),
    maxValue: maxValue(59),
  },
}))

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  rules,
)

const setForm = (date?: TimeDate) => {
  const time = new Time(date)
  form.year = String(time.get('year'))
  form.month = String(time.get('month') + 1)
  form.day = String(time.get('date'))
  form.hour = String(time.get('hour'))
  form.minute = String(time.get('minute'))
  form.second = String(time.get('second'))
}

setForm()

const localTime = computed<Time | null>(() => {
  if (!isFormValid()) return null

  const date = new Date(
    Number(form.year),
    Number(form.month) - 1,
    Number(form.day),
    Number(form.hour),
    Number(form.minute),
    Number(form.second),
  )

  return new Time(date)
})

const datetimeFieldTimestamp = computed<number>(
  () => localTime.value?.timestamp || new Time().timestamp,
)

const outputItems = computed(() => [
  {
    label: t('date-form.seconds-label'),
    value: localTime.value?.utc(true).timestamp.toString() || '',
  },
  {
    label: t('date-form.milliseconds-label'),
    value: localTime.value?.utc(true).ms.toString() || '',
  },
])
</script>

<style lang="scss" scoped>
.date-form {
  display: grid;
  gap: toRem(40);
}

.date-form__output,
.date-form__input {
  display: grid;
  gap: toRem(20);
}

.date-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.date-form__input-fields {
  display: grid;
  grid-template-columns: repeat(6, minmax(toRem(60), 1fr));
  gap: toRem(8);

  @include respond-to(small) {
    grid-template-columns: repeat(3, minmax(toRem(60), 1fr));
  }
}

.date-form__output-item-label {
  @include field-label;
}

.date-form__output-item-value {
  @include text-ellipsis;
}
</style>
