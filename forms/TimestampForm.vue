<template>
  <form class="timestamp-form">
    <div class="timestamp-form__input">
      <h3>{{ $t('timestamp-form.input-title') }}</h3>
      <div class="timestamp-form__input-fields">
        <input-field
          v-model="form.timestamp"
          type="number"
          :label="$t('timestamp-form.timestamp-label')"
          :placeholder="$t('timestamp-form.timestamp-placeholder')"
          :error-message="getFieldErrorMessage('timestamp')"
          @blur="touchField('timestamp')"
        />
      </div>
    </div>
    <div class="timestamp-form__output">
      <h3>{{ $t('timestamp-form.output-title') }}</h3>
      <div v-for="(item, idx) in outputItems" :key="`${item.label}-${idx}`">
        <p class="timestamp-form__output-item-label">
          {{ item.label }}
        </p>
        <app-copy :value="item.value">
          <p class="timestamp-form__output-item-value">
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
import { integer, maxLength, minValue, required } from '@/helpers'
import { Time } from '@distributedlab/tools'
import { computed, reactive } from 'vue'
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
const outputItems = computed(() => [
  {
    label: t('timestamp-form.format-label'),
    value: t('timestamp-form.format-value'),
  },
  {
    label: t('timestamp-form.gmt-label'),
    value: isValidTime.value ? time.value.toDate().toUTCString() : '',
  },
  {
    label: t('timestamp-form.time-zone-label'),
    value: isValidTime.value ? time.value.toDate().toString() : '',
  },
  {
    label: t('timestamp-form.relative-time-label'),
    value: isValidTime.value ? time.value.toNow : '',
  },
])
</script>

<style lang="scss" scoped>
.timestamp-form {
  display: grid;
  gap: toRem(40);
}

.timestamp-form__output,
.timestamp-form__input {
  display: grid;
  gap: toRem(20);
}

.timestamp-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.timestamp-form__input-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.timestamp-form__output-item-label {
  @include field-label;
}

.timestamp-form__output-item-value {
  @include text-ellipsis;
}
</style>
