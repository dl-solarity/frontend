<template>
  <form class="verify-signature-form" @submit.prevent="verifySignature">
    <div class="verify-signature-form__input">
      <div class="verify-signature-form__title-wrp">
        <h3 class="verify-signature-form__title">
          {{ $t('verify-signature-form.input-title') }}
        </h3>
        <radio-button-field
          v-model="form.messageMode"
          class="verify-signature-form__radio-button-field"
          :options="decodeOptions"
        />
      </div>
      <template v-if="verifyingState === 'verified'">
        <app-alert
          type="success"
          :message="$t('verify-signature-form.alert-success')"
        />
      </template>
      <template v-if="verifyingState === 'unverified'">
        <app-alert
          type="error"
          :message="$t('verify-signature-form.alert-error')"
        />
      </template>
      <div class="verify-signature-form__input-fields">
        <input-field
          v-model="form.accountAddress"
          :label="$t('verify-signature-form.account-address-label')"
          :placeholder="$t('verify-signature-form.account-address-placeholder')"
          :error-message="getFieldErrorMessage('accountAddress')"
          @blur="touchField('accountAddress')"
        />
        <input-field
          v-model="form.signature"
          :label="$t('verify-signature-form.signature-label')"
          :placeholder="$t('verify-signature-form.signature-placeholder')"
          :error-message="getFieldErrorMessage('signature')"
          @blur="touchField('signature')"
        />
        <textarea-field
          v-model="form.message"
          :label="$t('verify-signature-form.message-label')"
          :placeholder="$t('verify-signature-form.message-placeholder')"
          :error-message="getFieldErrorMessage('message')"
          @blur="touchField('message')"
        />
        <div class="verify-signature-form__buttons">
          <app-button
            class="verify-signature-form__button"
            type="submit"
            :text="$t('verify-signature-form.submit-btn')"
          />
          <app-button
            class="verify-signature-form__button"
            scheme="flat"
            :text="$t('verify-signature-form.reset-btn')"
            @click="resetForm"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useFormValidation } from '@/composables'
import { InputField, TextareaField, RadioButtonField } from '@/fields'
import { address, required, hexadecimal, ErrorHandler } from '@/helpers'
import { type FieldOption, type DecodeType } from '@/types'
import { getAddress, recoverAddress, toUtf8Bytes } from 'ethers'
import { i18n } from '~/plugins/localization'

type VerifyingState = 'idle' | 'verified' | 'unverified'

const { t } = i18n.global

const decodeOptions = computed<FieldOption[]>(() => [
  { title: t('hash-function-form.select-option-text'), value: 'text' },
  { title: t('hash-function-form.select-option-hex'), value: 'hex' },
])

const INITIAL_FORM_STATE = {
  accountAddress: '',
  signature: '',
  message: '',
  messageMode: decodeOptions.value[0].value as DecodeType,
}

const verifyingState = ref<VerifyingState>('idle')

const form = reactive({ ...INITIAL_FORM_STATE })

const rules = computed(() => ({
  accountAddress: { required, address },
  signature: { required, hexadecimal },
  message: {
    required,
    ...(form.messageMode === 'hex' && { hexadecimal, required }),
  },
}))

const { isFormValid, getFieldErrorMessage, touchField, validationController } =
  useFormValidation(form, rules)

const verifySignature = () => {
  if (!isFormValid()) return
  try {
    const messageToVerify =
      form.messageMode === 'hex' ? form.message : toUtf8Bytes(form.message)
    const signerAddr = recoverAddress(messageToVerify, form.signature)
    if (signerAddr !== getAddress(form.accountAddress)) {
      verifyingState.value = 'unverified'
      return
    }
    verifyingState.value = 'verified'
  } catch (error) {
    verifyingState.value = 'unverified'
    ErrorHandler.processWithoutFeedback(error)
  }
}

const resetVerifyingState = () => {
  verifyingState.value = 'idle'
}

const resetForm = () => {
  Object.assign(form, INITIAL_FORM_STATE)
  validationController.value.$reset()
  resetVerifyingState()
}

watch(form, () => {
  resetVerifyingState()
})
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

.verify-signature-form__title-wrp {
  display: flex;
  align-items: baseline;
  gap: inherit;
  flex-wrap: wrap;
}

.verify-signature-form__title {
  margin-right: auto;
  min-width: max-content;
}

.verify-signature-form__output-item-label {
  @include field-label;
}

.verify-signature-form__output-item-value {
  @include text-ellipsis;
}

.verify-signature-form__buttons {
  margin-top: toRem(4);
  display: flex;
  gap: toRem(16);
}

.verify-signature-form__button {
  width: toRem(150);
}
</style>
