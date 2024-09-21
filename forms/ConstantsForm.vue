<template>
  <form class="constants-form" @submit.prevent>
    <div class="constants-form__input">
      <h3>{{ $t('constants-form.title') }}</h3>
      <div>
        <div class="constants-form__label-wrp">
          <label class="constants-form__label">
            {{ $t(`constants-form.random-bytes32-label`) }}
          </label>
          <button @click="updateRandomBytes">
            <app-icon class="constants-form__btn-icon" :name="$icons.refresh" />
          </button>
        </div>
        <input-field v-model="form.randomBytes32" readonly>
          <template #nodeLeft>
            <app-copy :value="form.randomBytes32" />
          </template>
        </input-field>
      </div>
    </div>

    <input-field
      v-model="form.zeroBytes32"
      readonly
      :label="$t(`constants-form.zero-bytes32-label`)"
    >
      <template #nodeLeft>
        <app-copy :value="form.zeroBytes32" />
      </template>
    </input-field>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy, AppIcon } from '#components'
import { InputField } from '@/fields'
import { reactive } from 'vue'
import { randomBytes, hexlify } from 'ethers'
import { ZERO_BYTES_32 } from '@/constants'

const updateRandomBytes = () => (form.randomBytes32 = generateRandomBytes())
const generateRandomBytes = (): string => hexlify(randomBytes(32))

const form = reactive({
  zeroBytes32: ZERO_BYTES_32,
  randomBytes32: generateRandomBytes(),
})
</script>

<style lang="scss" scoped>
.constants-form {
  @include solidity-tools-form;
}

.constants-form__input {
  @include solidity-tools-form-part;
}

.constants-form__label-wrp {
  display: flex;
  gap: toRem(8);
  align-items: center;
  margin-bottom: var(--field-label-margin-bottom);
}

.constants-form__label {
  @include field-label;

  margin-bottom: 0;
}

.constants-form .constants-form__btn-icon {
  height: toRem(16);
  width: toRem(16);
  color: var(--primary-main);
}
</style>
