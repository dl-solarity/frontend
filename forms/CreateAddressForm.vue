<template>
  <form class="create-address-form">
    <div class="create-address-form__input">
      <h3>{{ $t('create-address-form.input-title') }}</h3>
      <div class="create-address-form__input-fields">
        <input-field
          v-model="form.accountAddress"
          :label="$t('create-address-form.account-address-label')"
          :placeholder="$t('create-address-form.account-address-placeholder')"
          :error-message="getFieldErrorMessage('accountAddress')"
          @blur="touchField('accountAddress')"
        />
        <input-field
          v-model="form.accountNonce"
          :label="$t('create-address-form.account-nonce-label')"
          :placeholder="$t('create-address-form.account-nonce-placeholder')"
          :error-message="getFieldErrorMessage('accountNonce')"
          @blur="touchField('accountNonce')"
        />
      </div>
    </div>
    <div class="create-address-form__divider" />
    <div class="create-address-form__output">
      <h3>{{ $t('create-address-form.output-title') }}</h3>
      <div>
        <p class="create-address-form__output-item-label">
          {{ $t('create-address-form.contract-address-label') }}
        </p>
        <app-copy :value="contractAddress">
          <p class="create-address-form__output-item-value">
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
import { InputField } from '@/fields'
import { ErrorHandler, address, integer, minValue, required } from '@/helpers'
import { getCreateAddress } from 'ethers'
import { reactive, ref, watch } from 'vue'

const contractAddress = ref('')
const form = reactive({
  accountAddress: '',
  accountNonce: '',
})

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  {
    accountAddress: { required, address },
    accountNonce: { required, integer, minValue: minValue(0) },
  },
)
watch(form, () => {
  if (!isFormValid()) {
    contractAddress.value = ''
    return
  }

  try {
    contractAddress.value = getCreateAddress({
      from: form.accountAddress,
      nonce: form.accountNonce,
    })
  } catch (error) {
    contractAddress.value = ''
    ErrorHandler.process(error)
  }
})
</script>

<style lang="scss" scoped>
.create-address-form {
  @include solidity-tools-form;
}

.create-address-form__output,
.create-address-form__input {
  @include solidity-tools-form-part;
}

.create-address-form__divider {
  @include solidity-tools-form-divider;
}

.create-address-form__input-fields {
  display: flex;
  gap: toRem(16);

  @include respond-to(small) {
    flex-direction: column;
  }
}

.create-address-form__output-item-label {
  @include field-label;
}

.create-address-form__output-item-value {
  @include text-ellipsis;
}
</style>
