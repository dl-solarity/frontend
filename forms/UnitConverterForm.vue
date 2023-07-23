<template>
  <form class="unit-converter-form">
    <div class="unit-converter-form__create">
      <div class="unit-converter-form__create-fields">
        <input-field
          v-for="(_, name) in units"
          v-model="units[name].value"
          :key="name"
          :label="$t(`unit-converter-form.${name}-title`)"
          @update:model-value="formatInputs(units[name].value, name)"
        >
          <template #nodeLeft>
            <copy :value="units[name].value || 0" />
          </template>
        </input-field>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { toUnits, fromUnits } from '@/helpers'
import { InputField } from '@/fields'
import { Copy } from '#components'
import { isEmpty, isNaN } from 'lodash-es'

const units = reactive({
  wei: { value: '', decimals: 18 },
  kwei: { value: '', decimals: 15 },
  mwei: { value: '', decimals: 12 },
  gwei: { value: '', decimals: 9 },
  finney: { value: '', decimals: 6 },
  szabo: { value: '', decimals: 3 },
  ether: { value: '', decimals: 0 },
  kether: { value: '', decimals: -3 },
  mether: { value: '', decimals: -6 },
  gether: { value: '', decimals: -9 },
  tether: { value: '', decimals: -12 },
})

const formatInputs = (value: string, name: keyof typeof units) => {
  const unitsKeys = Object.keys(units) as (keyof typeof units)[]
  const formatValues = unitsKeys.filter(item => item !== name)
  const formattedValue = value.trim()
  if (isEmpty(formattedValue) || isNaN(+formattedValue)) {
    formatValues.forEach(item => {
      units[item].value = ''
    })
    return
  }
  const currentUnitDecimal = units[name].decimals
  const rawValue = fromUnits(value, currentUnitDecimal)
  formatValues.forEach(item => {
    units[item].value = toUnits(rawValue, units[item].decimals)
  })
}

onMounted(() => {
  units.ether.value = '1'
  formatInputs(units.ether.value, 'ether')
})
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
