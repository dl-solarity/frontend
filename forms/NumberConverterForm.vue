<template>
  <form class="number-converter-form">
    <div class="number-converter-form__input">
      <h3>{{ $t('number-converter-form.input-title') }}</h3>
      <input-field
        v-for="(_, key) in form"
        :model-value="form[key]"
        :key="key"
        :label="$t(`number-converter-form.${key}-label`)"
        :placeholder="$t(`number-converter-form.${key}-placeholder`)"
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
import { NUMBER_SYSTEMS } from '@/constants'
import { InputField } from '@/fields'
import { binary, hexadecimal, integer, octal } from '@/helpers'
import { BigNumber } from 'bignumber.js'
import { isEmpty } from 'lodash-es'
import { reactive } from 'vue'

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

const formatInputs = (value: string | number, key: keyof typeof form) => {
  form[key] = String(value)

  const formKeys = Object.keys(form) as (keyof typeof form)[]
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
