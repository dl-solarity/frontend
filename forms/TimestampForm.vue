<template>
  <form class="timestamp-form">
    <div class="timestamp-form__create">
      <h2 class="timestamp-form__create-title">
        {{ $t('timestamp-form.create-title') }}
      </h2>
      <div class="timestamp-form__create-fields">
        <input-field
          v-model="form.timestamp"
          type="number"
          :label="$t('timestamp-form.timestamp-title')"
          :error-message="getFieldErrorMessage('timestamp')"
          @blur="touchField('timestamp')"
        />
      </div>
    </div>
    <div class="timestamp-form__output">
      <h2 class="timestamp-form__output-title">
        {{ $t('timestamp-form.output-title') }}
      </h2>
      <div class="timestamp-form__output-content">
        <div
          v-for="(item, index) in timeList"
          :key="index"
          class="timestamp-form__output-content-item"
        >
          <p class="timestamp-form__output-content-item-title">
            {{ item.title }}
          </p>
          <copy :value="item.format">
            <p class="timestamp-form__output-content-item-value">
              {{ item.format || '–' }}
            </p>
          </copy>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { Time } from '@distributedlab/tools'
import { required, integer, minValue, maxLength } from '@/helpers'
import { InputField } from '@/fields'
import { Copy } from '#components'
import { useFormValidation } from '@/composables'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const form = reactive({
  timestamp: new Time().timestamp,
})

const { isFieldsValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  {
    timestamp: {
      required,
      integer,
      minValue: minValue(0),
      maxLength: maxLength(13),
    },
  },
)

const time = computed(() => new Time(Number(form.timestamp)))
const isValidTime = computed(() => time.value.isValid && isFieldsValid.value)
const timeList = computed(() => [
  {
    title: t('timestamp-form.format-title'),
    format: t('timestamp-form.seconds-title'),
  },
  {
    title: t('timestamp-form.gmt-title'),
    format: isValidTime.value ? time.value.toDate().toUTCString() : '',
  },
  {
    title: t('timestamp-form.time-zone-title'),
    format: isValidTime.value ? time.value.toDate().toString() : '',
  },
  {
    title: t('timestamp-form.relative-time-title'),
    format: isValidTime.value ? time.value.toNow : '',
  },
])
</script>

<style lang="scss" scoped>
.timestamp-form {
  display: grid;
  gap: toRem(40);
}

.timestamp-form__output,
.timestamp-form__create {
  display: grid;
  gap: toRem(20);
}

.timestamp-form__create {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.timestamp-form__create-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.timestamp-form__output-content {
  display: grid;
  gap: toRem(32);
}

.timestamp-form__output-content-item {
  display: grid;
  gap: toRem(4);
}

.timestamp-form__output-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.timestamp-form__output-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
