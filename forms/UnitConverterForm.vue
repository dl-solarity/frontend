<template>
  <form class="unit-converter-form">
    <div class="unit-converter-form__input">
      <h3>{{ $t('unit-converter-form.input-title') }}</h3>
      <input-field
        v-for="(_, key) in form"
        :key="key"
        :label="UNITS[key].title"
        :placeholder="UNITS[key].title"
        :model-value="form[key]"
        :error-message="getFieldErrorMessage(key)"
        @blur="touchField(key)"
        @update:model-value="formatInputs($event, key)"
      >
        <template #nodeLeft>
          <app-copy :value="form[key] || 0" />
        </template>
      </input-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { UNITS } from '@/constants'
import { InputField } from '@/fields'
import { fromUnits, numeric, toUnits } from '@/helpers'
import { isEmpty, mapValues } from 'lodash-es'
import { reactive } from 'vue'

const form = reactive({
  wei: '',
  kwei: '',
  mwei: '',
  gwei: '',
  finney: '',
  szabo: '',
  ether: '',
  kether: '',
  mether: '',
  gether: '',
  tether: '',
})

const { getFieldErrorMessage, touchField, isFormValid } = useFormValidation(
  form,
  mapValues(form, () => ({ numeric })),
)

const formatInputs = (value: string | number, key: keyof typeof form) => {
  form[key] = String(value)

  const formKeys = Object.keys(form) as (keyof typeof form)[]
  const filteredKeys = formKeys.filter(_key => _key !== key)
  const formattedValue = String(value).trim()

  if (isEmpty(formattedValue) || !isFormValid()) {
    for (key of filteredKeys) form[key] = ''
    return
  }

  const etherAmount = fromUnits(formattedValue, UNITS[key].decimals)
  for (key of filteredKeys)
    form[key] = toUnits(etherAmount, UNITS[key].decimals)
}

formatInputs('1', 'ether')
</script>

<style lang="scss" scoped>
.unit-converter-form {
  @include solidity-tools-form;
}

.unit-converter-form__input {
  @include solidity-tools-form-part;
}
</style>
