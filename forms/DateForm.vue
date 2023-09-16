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
        :model-value="calendarDate"
        @update:model-value="setDate($event)"
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
import { ErrorHandler, integer, maxValue, minValue, required } from '@/helpers'
import { Time } from '@distributedlab/tools'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global
const calendarDate = ref(new Time().timestamp)
const maxDayInMonth = ref(31)
const currentDate = ref<Date | null>(null)

const form = reactive({
  year: '',
  month: '',
  day: '',
  hour: '',
  minute: '',
  second: '',
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

const { isFormValid, getFieldErrorMessage, touchField, isFieldsValid } =
  useFormValidation(form, rules)

const outputItems = computed(() => [
  {
    label: t('date-form.seconds-label'),
    value:
      isFieldsValid.value && currentDate.value
        ? new Time(currentDate.value).timestamp.toString()
        : '',
  },
  {
    label: t('date-form.milliseconds-label'),
    value:
      isFieldsValid.value && currentDate.value
        ? new Time(currentDate.value).ms.toString()
        : '',
  },
])

watch(form, () => {
  setMaxDays()

  if (!isFormValid()) {
    currentDate.value = null
    calendarDate.value = new Time().timestamp
    return
  }

  try {
    currentDate.value = new Date(
      +form.year,
      +form.month - 1,
      +form.day,
      +form.hour,
      +form.minute,
      +form.second,
    )
    calendarDate.value = currentDate.value.getTime() / 1000
  } catch (error) {
    currentDate.value = null
    calendarDate.value = new Time().timestamp
    ErrorHandler.processWithoutFeedback(error)
  }
})

const setDate = (date: Date | number | string) => {
  const time = new Time(date)
  form.year = time.dayjs.year().toString()
  form.month = (time.dayjs.month() + 1).toString()
  form.day = time.dayjs.date().toString()
  form.hour = time.dayjs.hour().toString()
  form.minute = time.dayjs.minute().toString()
  form.second = time.dayjs.second().toString()
}

const setMaxDays = () => {
  if (getFieldErrorMessage('year') || getFieldErrorMessage('month')) return
  maxDayInMonth.value = new Time(
    new Date(+form.year, +form.month - 1),
  ).dayjs.daysInMonth()
}

onMounted(() => {
  const time = new Time()
  currentDate.value = time.toDate()
  setDate(currentDate.value)
})
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
