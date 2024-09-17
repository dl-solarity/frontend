<template>
  <form class="ascii-converter-form">
    <div class="ascii-converter-form__input">
      <h3>{{ $t('ascii-converter-form.input-title') }}</h3>
      <textarea-field
        v-for="(value, key) in form"
        size="small"
        :model-value="value"
        :key="key"
        :label="$t(`ascii-converter-form.${key}-label`)"
        :placeholder="$t(`ascii-converter-form.${key}-placeholder`)"
        :error-message="getFieldErrorMessage(key)"
        @update:model-value="formatInputs($event, key)"
        @blur="touchField(key)"
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
import { TextareaField } from '@/fields'
import { hexadecimal } from '@/helpers'
import { isEmpty } from 'lodash-es'
import { reactive } from 'vue'
import { hexToASCII, asciiToHex } from '@/helpers'

type AsciiConverterForm = {
  hexadecimal: string
  ascii: string
}

type AsciiConverterFormKeys = keyof AsciiConverterForm

const form = reactive<AsciiConverterForm>({
  hexadecimal: '',
  ascii: '',
})

const { getFieldErrorMessage, touchField, isFormValid } = useFormValidation(
  form,
  {
    hexadecimal: { hexadecimal },
    ascii: {},
  },
)

const formatInputs = (value: string | number, key: AsciiConverterFormKeys) => {
  form[key] = String(value)
  const formKeys = Object.keys(form) as Array<AsciiConverterFormKeys>
  const filteredKeys = formKeys.filter(_key => _key !== key)
  const formattedValue = String(value).trim()

  if (isEmpty(formattedValue) || !isFormValid()) {
    for (key of filteredKeys) form[key] = ''
    return
  }

  switch (key) {
    case 'hexadecimal':
      form.ascii = hexToASCII(form.hexadecimal)
      break
    case 'ascii':
      form.hexadecimal = asciiToHex(form.ascii)
      break
  }
}
</script>

<style lang="scss" scoped>
.ascii-converter-form {
  @include solidity-tools-form;
}

.ascii-converter-form__input {
  @include solidity-tools-form-part;
}
</style>
