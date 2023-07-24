<template>
  <form class="date-form">
    <div class="date-form__create">
      <div class="date-form__create-head">
        <h2 class="date-form__create-head-title">
          {{ $t('date-form.create-title') }}
        </h2>
        <datepicker
          v-model="calendarDate"
          dark
          enable-seconds
          :min-date="new Date(0)"
          position="right"
          class="date-form__calendar"
          @update:model-value="setDate(calendarDate)"
        >
          <template #dp-input>
            <app-button
              class="date-form__create-head-btn"
              scheme="none"
              size="none"
              :icon-left="$icons.calendar"
            />
          </template>
        </datepicker>
      </div>
      <div class="date-form__create-fields">
        <input-field
          v-for="(_, name) in form"
          :key="name"
          v-model="form[name]"
          :label="$t(`date-form.${name}-title`)"
          :error-message="getFieldErrorMessage(name)"
          @blur="touchField(name)"
        />
      </div>
    </div>
    <div class="date-form__output">
      <h2 class="date-form__output-title">
        {{ $t('date-form.output-title') }}
      </h2>
      <div class="date-form__output-content">
        <div
          v-for="(item, index) in timeList"
          :key="index"
          class="date-form__output-content-item"
        >
          <p class="date-form__output-content-item-title">
            {{ item.title }}
          </p>
          <copy :value="item.format">
            <p class="date-form__output-content-item-value">
              {{ item.format || '–' }}
            </p>
          </copy>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, computed } from 'vue'
import { required, integer, minValue, maxValue, ErrorHandler } from '@/helpers'
import { InputField } from '@/fields'
import { Copy, AppButton } from '#components'
import { useFormValidation } from '@/composables'
import { Time } from '@distributedlab/tools'
import { i18n } from '~/plugins/localization'
import Datepicker from '@vuepic/vue-datepicker'

const { t } = i18n.global
const calendarDate = ref('')
const maxDayInMonth = ref(31)
const currentDate = ref<Date | null>(null)

const form = reactive({
  year: '',
  month: '',
  date: '',
  hour: '',
  minute: '',
  second: '',
})

const rules = computed(() => ({
  year: {
    required,
    integer,
    minValue: minValue(1970),
    maxValue: maxValue(10000),
  },
  month: {
    required,
    integer,
    minValue: minValue(1),
    maxValue: maxValue(12),
  },
  date: {
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

const timeList = computed(() => [
  {
    title: t('date-form.seconds-title'),
    format:
      isFieldsValid.value && currentDate.value
        ? new Time(currentDate.value).timestamp.toString()
        : '',
  },
  {
    title: t('date-form.milliseconds-title'),
    format:
      isFieldsValid.value && currentDate.value
        ? new Time(currentDate.value).ms.toString()
        : '',
  },
])

watch(form, () => {
  setMaxDays()

  if (!isFormValid()) {
    currentDate.value = null
    calendarDate.value = ''
    return
  }

  try {
    currentDate.value = new Date(
      +form.year,
      +form.month - 1,
      +form.date,
      +form.hour,
      +form.minute,
      +form.second,
    )
    calendarDate.value = currentDate.value.toString()
  } catch (error) {
    currentDate.value = null
    calendarDate.value = ''
    ErrorHandler.processWithoutFeedback(error)
  }
})

const setDate = (date: Date | string) => {
  const time = new Time(date)
  form.year = time.dayjs.year().toString()
  form.month = (time.dayjs.month() + 1).toString()
  form.date = time.dayjs.date().toString()
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
.date-form__create {
  display: grid;
  gap: toRem(20);
}

.date-form__create {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--text-secondary-main);
}

.date-form__create-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: toRem(16);
}

.date-form__create-fields {
  display: grid;
  grid-template-columns: repeat(6, minmax(toRem(60), 1fr));
  gap: toRem(8);

  @include respond-to(small) {
    grid-template-columns: repeat(3, minmax(toRem(60), 1fr));
  }
}

.date-form__output-content {
  display: grid;
  gap: toRem(32);
}

.date-form__output-content-item {
  display: grid;
  gap: toRem(4);
}

.date-form__output-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.date-form__output-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
