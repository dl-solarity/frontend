<template>
  <form class="common-addresses-form">
    <div class="common-addresses-form__input">
      <h3>{{ $t('common-addresses-form.input-title') }}</h3>
      <input-field
        v-for="(_, key) in form"
        :key="key"
        readonly
        :label="$t(`common-addresses-form.${key}-label`)"
        :model-value="form[key]"
      >
        <template #nodeLeft>
          <app-copy :value="form[key]" />
        </template>
      </input-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { InputField } from '@/fields'
import { reactive } from 'vue'

const form = reactive({
  zeroAddress: '0x0000000000000000000000000000000000000000',
  allFsAddress: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
  allEsAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
})
</script>

<style lang="scss" scoped>
.common-addresses-form {
  @include solidity-tools-form;
}

.common-addresses-form__input {
  @include solidity-tools-form-part;
}
</style>
