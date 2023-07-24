<template>
  <form class="unit-converter-form">
    <div class="unit-converter-form__create">
      <div class="unit-converter-form__create-fields">
        <input-field
          v-for="(_, name) in form"
          :key="name"
          :label="UNITS[name].title"
          :model-value="form[name]"
          @update:model-value="formatInputs($event, name)"
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
import { reactive } from 'vue'
import { toUnits, fromUnits } from '@/helpers'
import { InputField } from '@/fields'
import { Copy } from '#components'
import { isEmpty, isNaN } from 'lodash-es'

const form = reactive({
  wei: '',
  kwei: '',
  mwei: '',
  gwei: '',
  finney: '',
  szabo: '',
  ether: '1',
  kether: '',
  mether: '',
  gether: '',
  tether: '',
})

const UNITS = {
  wei: { title: 'Wei', decimals: 18 },
  kwei: { title: 'KWei', decimals: 15 },
  mwei: { title: 'MWei', decimals: 12 },
  gwei: { title: 'GWei', decimals: 9 },
  finney: { title: 'Finney', decimals: 6 },
  szabo: { title: 'Szabo', decimals: 3 },
  ether: { title: 'Ether', decimals: 0 },
  kether: { title: 'KEther', decimals: -3 },
  mether: { title: 'MEther', decimals: -6 },
  gether: { title: 'GEther', decimals: -9 },
  tether: { title: 'TEther', decimals: -12 },
}

const formatInputs = (value: string | number, name: keyof typeof form) => {
  form[name] = String(value)

  const formKeys = Object.keys(form) as (keyof typeof form)[]
  const filteredKeys = formKeys.filter(item => item !== name)
  const formattedValue = String(value).trim()

  if (isEmpty(formattedValue) || isNaN(+formattedValue)) {
    filteredKeys.forEach(item => {
      form[item] = ''
    })
    return
  }

  const rawValue = fromUnits(formattedValue, UNITS[name].decimals)
  filteredKeys.forEach(item => {
    form[item] = toUnits(rawValue, UNITS[item].decimals)
  })
}

formatInputs(form.ether, 'ether')
</script>

<style lang="scss" scoped>
.unit-converter-form {
  display: grid;
  gap: toRem(40);
}

.unit-converter-form__create {
  display: grid;
  gap: toRem(20);
}

.unit-converter-form__create-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}
</style>
