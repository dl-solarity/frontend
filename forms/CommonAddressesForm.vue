<template>
  <form class="common-addresses-form" @submit.prevent>
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
          <button
            v-if="key === 'randomAddress'"
            @click="form.randomAddress = generateRandomAddress()"
          >
            <app-icon
              class="common-addresses-form__btn-icon"
              :name="$icons.refresh"
            />
          </button>
        </template>
      </input-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy, AppIcon } from '#components'
import { InputField } from '@/fields'
import { Wallet } from 'ethers'
import { onMounted, reactive } from 'vue'

const generateRandomAddress = (): string => Wallet.createRandom().address

const form = reactive({
  zeroAddress: '0x0000000000000000000000000000000000000000',
  allFsAddress: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
  allEsAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  randomAddress: '',
})

onMounted(() => {
  form.randomAddress = generateRandomAddress()
})
</script>

<style lang="scss" scoped>
.common-addresses-form {
  @include solidity-tools-form;
}

.common-addresses-form__input {
  @include solidity-tools-form-part;
}

.common-addresses-form .common-addresses-form__btn-icon {
  height: toRem(16);
  width: toRem(16);
  color: var(--primary-main);
}
</style>
