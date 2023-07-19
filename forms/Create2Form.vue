<template>
  <form class="create-2-form">
    <div class="create-2-form__create">
      <h2 class="create-2-form__create-title">
        {{ $t('create-2-form.create-title') }}
      </h2>
      <div class="create-2-form__create-fields">
        <input-field
          v-model="form.address"
          :label="$t('create-2-form.account-address-title')"
          :error-message="getFieldErrorMessage('address')"
          @blur="touchField('address')"
          :disabled="isFormDisabled"
        />
        <input-field
          v-model="form.contractCode"
          :label="$t('create-2-form.contract-code-title')"
          :error-message="getFieldErrorMessage('contractCode')"
          @blur="touchField('contractCode')"
          :disabled="isFormDisabled"
        />
        <input-field
          v-model="form.salt"
          :label="$t('create-2-form.salt-title')"
          :error-message="getFieldErrorMessage('salt')"
          @blur="touchField('salt')"
          :disabled="isFormDisabled"
        />
      </div>
    </div>
    <div class="create-2-form__result">
      <h2 class="create-2-form__result-title">
        {{ $t('create-2-form.result-title') }}
      </h2>
      <div class="create-2-form__result-content">
        <div class="create-2-form__result-content-item">
          <p class="create-2-form__result-content-item-title">
            {{ $t('create-2-form.contract-address-title') }}
          </p>
          <copy :value="contractAddress">
            <p class="create-2-form__result-content-item-value">
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
import { required, address, hash, ErrorHandler } from '@/helpers'
import { InputField } from '@/fields'
// import { Copy } from 'components'
import { useForm, useFormValidation } from '@/composables'

const contractAddress = ref('')
const form = reactive({
  address: '',
  contractCode: '',
  salt: '',
})

const { isFormDisabled } = useForm()
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
.create-2-form {
  display: grid;
  gap: toRem(40);
}

.create-2-form__result,
.create-2-form__create {
  display: grid;
  gap: toRem(20);
}

.create-2-form__create {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--text-secondary-main);
}

.create-2-form__create-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.create-2-form__result-content {
  display: grid;
  gap: toRem(32);
}

.create-2-form__result-content-item {
  display: grid;
  gap: toRem(4);
}

.create-2-form__result-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.create-2-form__result-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
