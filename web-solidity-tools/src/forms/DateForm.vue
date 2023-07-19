<template>
  <form class="date-form">
    <div class="date-form__create">
      <div class="date-form__create-head">
        <h2 class="date-form__create-head-title">
          {{ $t('date-form.create-title') }}
        </h2>
        <datepicker
          v-model="date"
          dark
          enable-seconds
          utc
          :min-date="new Date(0).toUTCString()"
          position="right"
          class="date-form__calendar"
          @update:model-value="setDate(date)"
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
          v-for="(_, name, index) in form"
          :key="index"
          v-model="form[name]"
          :label="$t(`date-form.${name}-title`)"
          :error-message="getFieldErrorMessage(name)"
          @blur="touchField(name)"
          :disabled="isFormDisabled"
        />
      </div>
    </div>
    <div class="date-form__result">
      <h2 class="date-form__result-title">
        {{ $t('date-form.result-title') }}
      </h2>
      <div class="date-form__result-content">
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
import { Copy, AppButton } from '@/common'
import { useForm, useFormValidation } from '@/composables'
import { Time } from '@distributedlab/tools'
import Datepicker from '@vuepic/vue-datepicker'

const date = ref('')
const curtime = ref<Date | null>(null)

const form = reactive({
  year: '',
  month: '',
  date: '',
  hour: '',
  minute: '',
  second: '',
})

const { isFormDisabled } = useForm()
const { isFormValid, getFieldErrorMessage, touchField, isFieldsValid } =
  useFormValidation(form, {
    year: {
      required,
      integer,
      minValue: minValue(1970),
      maxValue: maxValue(10000),
    },
    month: { required, integer },
    date: { required, integer, minValue: minValue(1), maxValue: maxValue(31) },
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
  })

onMounted(() => {
  const time = new Time()
  curtime.value = time.toDate()
  setDate(time.toDate())
})

const timeList = computed(() => [
  {
    title: 'Seconds',
    format:
      isFieldsValid.value && curtime.value
        ? new Time(curtime.value).timestamp.toString()
        : '',
  },
  {
    title: 'Milliseconds',
    format:
      isFieldsValid.value && curtime.value
        ? new Time(curtime.value).ms.toString()
        : '',
  },
])

const setDate = (date: Date | string) => {
  const time = new Time(date)
  form.year = time.dayjs.year().toString()
  form.month = (time.dayjs.month() + 1).toString()
  form.date = time.dayjs.date().toString()
  form.hour = time.dayjs.hour().toString()
  form.minute = time.dayjs.minute().toString()
  form.second = time.dayjs.second().toString()
}

watch(form, () => {
  if (!isFormValid()) {
    curtime.value = null
    date.value = ''
    return
  }

  try {
    curtime.value = new Date(
      Date.UTC(
        +form.year,
        +form.month - 1,
        +form.date,
        +form.hour,
        +form.minute,
        +form.second,
      ),
    )
    date.value = curtime.value.toUTCString()
  } catch (error) {
    curtime.value = null
    date.value = ''
    ErrorHandler.processWithoutFeedback(error)
  }
})
</script>

<style lang="scss" scoped>
.date-form {
  display: grid;
  gap: toRem(40);
}

.date-form__result,
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

.date-form__result-content {
  display: grid;
  gap: toRem(32);
}

.date-form__result-content-item {
  display: grid;
  gap: toRem(4);
}

.date-form__result-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.date-form__result-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
