<template>
  <form class="create2-address-form">
    <div class="create2-address-form__input">
      <h3>{{ $t('create2-address-form.input-title') }}</h3>
      <div class="create2-address-form__input-fields">
        <input-field
          v-model="form.accountAddress"
          :label="$t('create2-address-form.account-address-label')"
          :placeholder="$t('create2-address-form.account-address-placeholder')"
          :error-message="getFieldErrorMessage('accountAddress')"
          @blur="touchField('accountAddress')"
        />
        <input-field
          v-model="form.salt"
          :label="$t('create2-address-form.salt-label')"
          :placeholder="$t('create2-address-form.salt-placeholder')"
        />
        <textarea-field
          v-model="form.contractInitCode"
          :label="$t('create2-address-form.contract-code-label')"
          :placeholder="$t('create2-address-form.contract-code-placeholder')"
          :error-message="getFieldErrorMessage('contractInitCode')"
          @blur="touchField('contractInitCode')"
        />
      </div>
    </div>
    <div class="create2-address-form__divider" />
    <div class="create2-address-form__output">
      <h3>{{ $t('create2-address-form.output-title') }}</h3>
      <div>
        <p class="create2-address-form__output-item-label">
          {{ $t('create2-address-form.contract-address-label') }}
        </p>
        <app-copy :value="contractAddress">
          <p class="create2-address-form__output-item-value">
            {{ contractAddress || '–' }}
          </p>
        </app-copy>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { InputField, TextareaField } from '@/fields'
import {
  ErrorHandler,
  address,
  checkIsHexadecimal,
  hexadecimal,
  keccak256,
  required,
} from '@/helpers'
import { getCreate2Address } from 'ethers'
import { reactive, ref, watch } from 'vue'

const contractAddress = ref('')
const form = reactive({
  accountAddress: '',
  salt: '',
  contractInitCode: '',
})

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  {
    accountAddress: { required, address },
    contractInitCode: { required, hexadecimal },
  },
)

watch(form, () => {
  if (!isFormValid()) {
    contractAddress.value = ''
    return
  }

  try {
    contractAddress.value = getCreate2Address(
      form.accountAddress,
      keccak256(form.salt, checkIsHexadecimal(form.salt) ? 'hex' : 'text'),
      keccak256(form.contractInitCode, 'hex'),
    )
  } catch (error) {
    contractAddress.value = ''
    ErrorHandler.process(error)
  }
})
</script>

<style lang="scss" scoped>
.create2-address-form {
  @include solidity-tools-form;
}

.create2-address-form__output,
.create2-address-form__input {
  @include solidity-tools-form-part;
}

.create2-address-form__divider {
  @include solidity-tools-form-divider;
}

.create2-address-form__input-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.create2-address-form__output-item-label {
  @include field-label;
}

.create2-address-form__output-item-value {
  @include text-ellipsis;
}
</style>
