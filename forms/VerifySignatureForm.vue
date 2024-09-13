<template>
  <form class="verify-signature-form" @submit.prevent="verifySignature">
    <div class="verify-signature-form__input">
      <h3>{{ $t('verify-signature-form.input-title') }}</h3>
      <div class="verify-signature-form__input-fields">
        <input-field
          v-model="form.accountAddress"
          :label="$t('verify-signature-form.account-address-label')"
          :placeholder="$t('verify-signature-form.account-address-placeholder')"
          :error-message="getFieldErrorMessage('accountAddress')"
          @blur="touchField('accountAddress')"
        />
        <textarea-field
          v-model="form.message"
          :label="$t('verify-signature-form.message-label')"
          :placeholder="$t('verify-signature-form.message-placeholder')"
          :error-message="getFieldErrorMessage('message')"
          @blur="touchField('message')"
        />
        <textarea-field
          v-model="form.signature"
          :label="$t('verify-signature-form.signature-label')"
          :placeholder="$t('verify-signature-form.signature-placeholder')"
          :error-message="getFieldErrorMessage('signature')"
          @blur="touchField('signature')"
        />
        <div class="verify-signature-form__buttons">
          <app-button
            type="submit"
            :text="$t('verify-signature-form.submit-btn')"
          />
          <app-button
            scheme="flat"
            :text="$t('verify-signature-form.reset-btn')"
            @click="resetForm(form)"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useFormValidation } from '@/composables'
import { InputField, TextareaField } from '@/fields'
import { ErrorHandler, address, hexadecimal, required } from '@/helpers'
import { verifyMessage, getAddress } from 'ethers'
import { i18n } from '~/plugins/localization'
import { reactive } from 'vue'

const { showToast } = useNotifications()
const { t } = i18n.global

const form = reactive({
  accountAddress: '',
  signature: '',
  message: '',
})

const { isFormValid, getFieldErrorMessage, touchField, resetForm } =
  useFormValidation(form, {
    accountAddress: { required, address },
    signature: { required, hexadecimal },
    message: { required },
  })

const verifySignature = async () => {
  try {
    if (!isFormValid()) return
    const signerAddr = verifyMessage(form.message, form.signature)
    if (signerAddr !== getAddress(form.accountAddress)) {
      showToast('error', t('verify-signature-form.not-verified'))
      return
    }
    showToast('success', t('verify-signature-form.verified'))
  } catch (error) {
    ErrorHandler.process(error)
  }
}
</script>

<style lang="scss" scoped>
.verify-signature-form {
  @include solidity-tools-form;
}

.verify-signature-form__output,
.verify-signature-form__input {
  @include solidity-tools-form-part;
}

.verify-signature-form__divider {
  @include solidity-tools-form-divider;
}

.verify-signature-form__input-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.verify-signature-form__output-item-label {
  @include field-label;
}

.verify-signature-form__output-item-value {
  @include text-ellipsis;
}

.verify-signature-form__buttons {
  display: flex;
  gap: toRem(16);
}
</style>
