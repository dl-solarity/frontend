<template>
  <form class="number-converter-form">
    <div class="number-converter-form__create">
      <div class="number-converter-form__create-fields">
        <input-field
          v-for="(_, name) in form"
          v-model="form[name]"
          :key="name"
          :label="$t(`number-converter-form.${name}-title`)"
          :error-message="getFieldErrorMessage(name)"
          @blur="touchField(name)"
          @update:model-value="formatInputs(form[name], name)"
        >
          <template #nodeLeft>
            <copy :value="form[name] || 0" />
          </template>
        </input-field>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { hexadecimal, integer, octal, binary } from '@/helpers'
import { InputField } from '@/fields'
import { Copy } from '#components'
import { isEmpty } from 'lodash-es'
import { useFormValidation } from '@/composables'
import { BigNumber } from 'bignumber.js'

const form = reactive({
  binary: '',
  octal: '',
  decimal: '',
  hexadecimal: '',
})

const bases = reactive({
  binary: { base: 2, prefix: '0b' },
  octal: { base: 8, prefix: '0o' },
  decimal: { base: 10, prefix: '' },
  hexadecimal: { base: 16, prefix: '0x' },
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

const formatInputs = (value: string, name: keyof typeof form) => {
  const unitsKeys = Object.keys(form) as (keyof typeof form)[]
  const formatValues = unitsKeys.filter(item => item !== name)
  const formattedValue = value.trim()

  if (isEmpty(formattedValue) || !isFormValid()) {
    formatValues.forEach(item => {
      form[item] = ''
    })
    return
  }

  const currentUnitDecimal = bases[name]
  const rawValue = BigNumber(
    currentUnitDecimal.prefix.concat(value.toLowerCase()),
    bases[name].base,
  )
  formatValues.forEach(item => {
    form[item] = rawValue.isFinite() ? rawValue.toString(bases[item].base) : ''
  })
}

onMounted(() => {
  form.decimal = '10'
  formatInputs(form.decimal, 'decimal')
})
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
