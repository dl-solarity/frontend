<template>
  <form class="number-converter-form">
    <div class="number-converter-form__input">
      <h3>{{ $t('number-converter-form.input-title') }}</h3>
      <textarea-field
        v-for="(value, key) in form"
        size="small"
        :model-value="value"
        :key="key"
        :label="$t(`number-converter-form.${key}-label`)"
        :placeholder="$t(`number-converter-form.${key}-placeholder`)"
        :error-message="getFieldErrorMessage(key)"
        @update:model-value="formatInputs($event, key)"
        @blur="touchField(key)"
      >
        <template #nodeLeft>
          <app-copy :value="value" />
        </template>
      </textarea-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { NUMBER_SYSTEMS } from '@/constants'
import { TextareaField } from '@/fields'
import { binary, hexadecimal, integer, octal } from '@/helpers'
import { BigNumber } from 'bignumber.js'
import { isEmpty } from 'lodash-es'
import { reactive } from 'vue'

type NumberConverterFormKeys = keyof typeof form

const form = reactive({
  binary: '',
  octal: '',
  decimal: '',
  hexadecimal: '',
})

const { getFieldErrorMessage, touchField, isFormValid } = useFormValidation(
  form,
  {
    binary: { binary },
    octal: { octal },
    decimal: { integer },
    hexadecimal: { hexadecimal },
  },
)

const formatInputs = (value: string | number, key: NumberConverterFormKeys) => {
  form[key] = String(value)

  const formKeys = Object.keys(form) as NumberConverterFormKeys[]
  const filteredKeys = formKeys.filter(_key => _key !== key)
  const formattedValue = String(value).trim()

  if (isEmpty(formattedValue) || !isFormValid()) {
    for (key of filteredKeys) form[key] = ''
    return
  }

  const bigNumber = BigNumber(
    NUMBER_SYSTEMS[key].prefix.concat(formattedValue.toLowerCase()),
    NUMBER_SYSTEMS[key].base,
  )

  for (key of filteredKeys)
    form[key] = bigNumber.isFinite()
      ? NUMBER_SYSTEMS[key].prefix.concat(
          bigNumber.toString(NUMBER_SYSTEMS[key].base),
        )
      : ''
}

formatInputs('10', 'decimal')
</script>

<style lang="scss" scoped>
.number-converter-form {
  @include solidity-tools-form;
}

.number-converter-form__input {
  @include solidity-tools-form-part;
}
</style>
