<template>
  <form class="timestamp-form">
    <div class="timestamp-form__input">
      <h3>{{ $t('timestamp-form.input-title') }}</h3>
      <input-field
        v-model="form.timestamp"
        type="number"
        :label="$t('timestamp-form.timestamp-label')"
        :placeholder="$t('timestamp-form.timestamp-placeholder')"
        :error-message="getFieldErrorMessage('timestamp')"
        @blur="touchField('timestamp')"
      />
    </div>
    <div class="timestamp-form__divider" />
    <div class="timestamp-form__output">
      <h3>{{ $t('timestamp-form.output-title') }}</h3>
      <div v-for="(item, idx) in outputItems" :key="idx">
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
import { capitalize, integer, maxValue, minValue, required } from '@/helpers'
import { Time } from '@distributedlab/tools'
import { computed, reactive } from 'vue'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

const form = reactive({
  timestamp: String(new Time().timestamp),
})

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  {
    timestamp: {
      required,
      integer,

      /**
       * Date object with less than this min timestamp (05/02/1924)
       * works incorrectly
       */
      minValue: minValue(-1441152000),

      maxValue: maxValue(8640000000000),
    },
  },
)

const time = computed<Time | null>(() =>
  isFormValid() ? new Time(Number(form.timestamp)) : null,
)

const outputItems = computed(() => [
  {
    label: t('timestamp-form.format-label'),
    value: capitalize(t('timestamp-form.format-value')),
  },
  {
    label: t('timestamp-form.gmt-label'),
    value: time.value ? capitalize(time.value.toDate().toUTCString()) : '',
  },
  {
    label: t('timestamp-form.time-zone-label'),
    value: time.value ? capitalize(time.value.toDate().toString()) : '',
  },
  {
    label: t('timestamp-form.relative-time-label'),
    value: time.value ? capitalize(time.value.fromNow) : '',
  },
])
</script>

<style lang="scss" scoped>
.timestamp-form {
  @include solidity-tools-form;
}

.timestamp-form__output,
.timestamp-form__input {
  @include solidity-tools-form-part;
}

.timestamp-form__divider {
  @include solidity-tools-form-divider;
}

.timestamp-form__output-item-label {
  @include field-label;
}

.timestamp-form__output-item-value {
  @include text-ellipsis;
}
</style>
