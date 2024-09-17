<template>
  <form class="unit-converter-form">
    <div class="unit-converter-form__input">
      <h3>{{ $t('unit-converter-form.input-title') }}</h3>
      <textarea-field
        v-for="(value, key) in form"
        size="small"
        :model-value="value"
        :key="key"
        :label="UNITS[key].title"
        :placeholder="UNITS[key].title"
        :error-message="getFieldErrorMessage(key)"
        @blur="touchField(key)"
        @update:model-value="formatInputs($event, key)"
      >
        <template #nodeLeft>
          <app-copy :value="value || 0" />
        </template>
      </textarea-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { UNITS } from '@/constants'
import { TextareaField } from '@/fields'
import { fromUnits, numeric, toUnits } from '@/helpers'
import { isEmpty, mapValues } from 'lodash-es'
import { reactive } from 'vue'

type UnitConverterFormKeys = keyof typeof form

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

const formatInputs = (value: string | number, key: UnitConverterFormKeys) => {
  form[key] = String(value)

  const formKeys = Object.keys(form) as UnitConverterFormKeys[]
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
