<template>
  <form class="create-address-form">
    <div class="create-address-form__create">
      <h3 class="create-address-form__create-title">
        {{ $t('create-address-form.create-title') }}
      </h3>
      <div class="create-address-form__create-fields">
        <input-field
          v-model="form.address"
          :label="$t('create-address-form.account-address-title')"
          :error-message="getFieldErrorMessage('address')"
          @blur="touchField('address')"
        />
        <input-field
          v-model="form.nonce"
          :label="$t('create-address-form.account-nonce-title')"
          :error-message="getFieldErrorMessage('nonce')"
          @blur="touchField('nonce')"
        />
      </div>
    </div>
    <div class="create-address-form__result">
      <h3 class="create-address-form__result-title">
        {{ $t('create-address-form.result-title') }}
      </h3>
      <div class="create-address-form__result-content">
        <div class="create-address-form__result-content-item">
          <p class="create-address-form__result-content-item-title">
            {{ $t('create-address-form.contract-address-title') }}
          </p>
          <copy :value="contractAddress">
            <p class="create-address-form__result-content-item-value">
              {{ contractAddress || '–' }}
            </p>
          </copy>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ethers } from 'ethers'
import { InputField } from '@/fields'
import { required, address, integer, minValue, ErrorHandler } from '@/helpers'
import { useFormValidation } from '@/composables'

const contractAddress = ref('')
const form = reactive({
  address: '',
  nonce: '',
})

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  {
    address: { required, address },
    nonce: { required, integer, minValue: minValue(0) },
  },
)
watch(form, () => {
  if (!isFormValid()) {
    contractAddress.value = ''
    return
  }

  try {
    contractAddress.value = ethers.getCreateAddress({
      from: form.address,
      nonce: form.nonce,
    })
  } catch (error) {
    contractAddress.value = ''
    ErrorHandler.processWithoutFeedback(error)
  }
})
</script>

<style lang="scss" scoped>
.create-address-form {
  display: grid;
  gap: toRem(40);
}

.create-address-form__result,
.create-address-form__create {
  display: grid;
  gap: toRem(20);
}

.create-address-form__create {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.create-address-form__create-fields {
  display: flex;
  gap: toRem(16);

  @include respond-to(small) {
    flex-direction: column;
  }
}

.create-address-form__result-content {
  display: grid;
  gap: toRem(32);
}

.create-address-form__result-content-item {
  display: grid;
  gap: toRem(4);
}

.create-address-form__result-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.create-address-form__result-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
