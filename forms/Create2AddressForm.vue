<template>
  <form class="create2-address-form">
    <div class="create2-address-form__create">
      <h3 class="create2-address-form__create-title">
        {{ $t('create2-address-form.create-title') }}
      </h3>
      <div class="create2-address-form__create-fields">
        <input-field
          v-model="form.address"
          :label="$t('create2-address-form.account-address-title')"
          :error-message="getFieldErrorMessage('address')"
          @blur="touchField('address')"
        />
        <input-field
          v-model="form.contractCode"
          :label="$t('create2-address-form.contract-code-title')"
          :error-message="getFieldErrorMessage('contractCode')"
          @blur="touchField('contractCode')"
        />
        <input-field
          v-model="form.salt"
          :label="$t('create2-address-form.salt-title')"
          :error-message="getFieldErrorMessage('salt')"
          @blur="touchField('salt')"
        />
      </div>
    </div>
    <div class="create2-address-form__result">
      <h3 class="create2-address-form__result-title">
        {{ $t('create2-address-form.result-title') }}
      </h3>
      <div class="create2-address-form__result-content">
        <div class="create2-address-form__result-content-item">
          <p class="create2-address-form__result-content-item-title">
            {{ $t('create2-address-form.contract-address-title') }}
          </p>
          <app-copy :value="contractAddress">
            <p class="create2-address-form__result-content-item-value">
              {{ contractAddress || '–' }}
            </p>
          </app-copy>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { InputField } from '@/fields'
import { ErrorHandler, address, hash, required } from '@/helpers'
import { ethers } from 'ethers'
import { reactive, ref, watch } from 'vue'

const contractAddress = ref('')
const form = reactive({
  address: '',
  contractCode: '',
  salt: '',
})

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  {
    address: { required, address },
    contractCode: { required, hash },
    salt: { required, hash },
  },
)

watch(form, () => {
  if (!isFormValid()) {
    contractAddress.value = ''
    return
  }
  try {
    contractAddress.value = ethers.getCreate2Address(
      form.address,
      form.salt,
      form.contractCode,
    )
  } catch (error) {
    contractAddress.value = ''
    ErrorHandler.processWithoutFeedback(error)
  }
})
</script>

<style lang="scss" scoped>
.create2-address-form {
  display: grid;
  gap: toRem(40);
}

.create2-address-form__result,
.create2-address-form__create {
  display: grid;
  gap: toRem(20);
}

.create2-address-form__create {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.create2-address-form__create-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.create2-address-form__result-content {
  display: grid;
  gap: toRem(32);
}

.create2-address-form__result-content-item {
  display: grid;
  gap: toRem(4);
}

.create2-address-form__result-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.create2-address-form__result-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
