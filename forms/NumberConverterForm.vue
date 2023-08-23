<template>
  <form class="number-converter-form">
    <div class="number-converter-form__create">
      <div class="number-converter-form__create-fields">
        <input-field
          v-for="(_, name) in form"
          :model-value="form[name]"
          :key="name"
          :label="$t(`number-converter-form.${name}-title`)"
          :error-message="getFieldErrorMessage(name)"
          @blur="touchField(name)"
          @update:model-value="formatInputs($event, name)"
        >
          <template #nodeLeft>
            <app-copy :value="form[name] || 0" />
          </template>
        </input-field>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { hexadecimal, integer, octal, binary } from '@/helpers'
import { InputField } from '@/fields'
import { AppCopy } from '#components'
import { isEmpty } from 'lodash-es'
import { useFormValidation } from '@/composables'
import { BigNumber } from 'bignumber.js'
import { NUMBER_SYSTEMS } from '@/constants'

const form = reactive({
  binary: '',
  octal: '',
  decimal: '10',
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

const formatInputs = (value: string | number, name: keyof typeof form) => {
  form[name] = String(value)

  const formKeys = Object.keys(form) as (keyof typeof form)[]
  const filteredKeys = formKeys.filter(item => item !== name)
  const formattedValue = String(value).trim()

  if (isEmpty(formattedValue) || !isFormValid()) {
    filteredKeys.forEach(item => {
      form[item] = ''
    })
    return
  }

  const rawValue = BigNumber(
    NUMBER_SYSTEMS[name].prefix.concat(formattedValue.toLowerCase()),
    NUMBER_SYSTEMS[name].base,
  )

  filteredKeys.forEach(item => {
    form[item] = rawValue.isFinite()
      ? rawValue.toString(NUMBER_SYSTEMS[item].base)
      : ''
  })
}

formatInputs(form.decimal, 'decimal')
</script>

<style lang="scss" scoped>
.number-converter-form {
  display: grid;
  gap: toRem(40);
}

.number-converter-form__create {
  display: grid;
  gap: toRem(20);
}

.number-converter-form__create-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}
</style>
