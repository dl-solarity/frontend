<template>
  <form class="common-addresses-form" @submit.prevent>
    <div class="common-addresses-form__input">
      <h3>{{ $t('common-addresses-form.input-title') }}</h3>
      <template v-for="(value, key) in form" :key="key">
        <div v-if="key === 'randomAddress'">
          <div class="common-addresses-form__label-wrp">
            <label class="common-addresses-form__label">
              {{ $t(`common-addresses-form.${key}-label`) }}
            </label>
            <button v-if="key === 'randomAddress'" @click="updateRandomAddress">
              <app-icon
                class="common-addresses-form__btn-icon"
                :name="$icons.refresh"
              />
            </button>
          </div>
          <input-field readonly :model-value="value">
            <template #nodeLeft>
              <app-copy :value="value" />
            </template>
          </input-field>
        </div>
        <input-field
          v-else
          readonly
          :label="$t(`common-addresses-form.${key}-label`)"
          :model-value="value"
        >
          <template #nodeLeft>
            <app-copy :value="value" />
          </template>
        </input-field>
      </template>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy, AppIcon } from '#components'
import { InputField } from '@/fields'
import { Wallet } from 'ethers'
import { reactive } from 'vue'

const generateRandomAddress = (): string => Wallet.createRandom().address
const updateRandomAddress = () => (form.randomAddress = generateRandomAddress())

const form = reactive({
  zeroAddress: '0x0000000000000000000000000000000000000000',
  allFsAddress: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
  allEsAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  randomAddress: generateRandomAddress(),
})
</script>

<style lang="scss" scoped>
.common-addresses-form {
  @include solidity-tools-form;
}

.common-addresses-form__input {
  @include solidity-tools-form-part;
}

.common-addresses-form__label-wrp {
  display: flex;
  gap: toRem(8);
  align-items: center;
  margin-bottom: var(--field-label-margin-bottom);
}

.common-addresses-form__label {
  @include field-label;

  margin-bottom: 0;
}

.common-addresses-form .common-addresses-form__btn-icon {
  height: toRem(16);
  width: toRem(16);
  color: var(--primary-main);
}
</style>
