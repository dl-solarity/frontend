<template>
  <form class="constants-form" @submit.prevent>
    <div class="constants-form__input">
      <h3>{{ $t('constants-form.title') }}</h3>
      <template v-for="(value, key) in form" :key="key">
        <div v-if="key === 'randomBytes32'">
          <div class="constants-form__label-wrp">
            <label class="constants-form__label">
              {{ $t(`constants-form.${key}-label`) }}
            </label>
            <button
              v-if="key === 'randomBytes32'"
              @click="form.randomBytes32 = generateRandomBytes()"
            >
              <app-icon
                class="constants-form__btn-icon"
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
          :label="$t(`constants-form.${key}-label`)"
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
import { reactive } from 'vue'
import { randomBytes, hexlify } from 'ethers'
import { ZERO_BYTES_32 } from '@/constants'

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
