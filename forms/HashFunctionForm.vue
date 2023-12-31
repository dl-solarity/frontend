<template>
  <form class="hash-function-form">
    <div class="hash-function-form__input">
      <div class="hash-function-form__title-wrp">
        <h3 class="hash-function-form__title">
          {{ $t('hash-function-form.input-title', { type: title }) }}
        </h3>
        <radio-button-field
          v-model="form.type"
          class="hash-function-form__radio-button-field"
          :options="decodeOptions"
        />
      </div>
      <textarea-field
        v-model="form.text"
        :label="$t('hash-function-form.text-title')"
        :error-message="getFieldErrorMessage('text')"
        @blur="touchField('text')"
      />
    </div>
    <div class="hash-function-form__divider" />
    <div class="hash-function-form__output">
      <h3>{{ $t('hash-function-form.output-title') }}</h3>
      <div>
        <p class="hash-function-form__output-item-label">
          {{ $t('hash-function-form.decoded-hash-label') }}
        </p>
        <app-copy :value="decodedHash">
          <p class="hash-function-form__output-item-value">
            {{ decodedHash || '-' }}
          </p>
        </app-copy>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppCopy } from '#components'
import { useFormValidation } from '@/composables'
import { RadioButtonField, TextareaField } from '@/fields'
import { ErrorHandler, hexadecimal, required } from '@/helpers'
import { type DecodeType, type FieldOption, type HashFunction } from '@/types'
import { reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

const props = defineProps<{
  title: string
  decode: HashFunction
}>()

const { t } = i18n.global

const decodeOptions = computed<FieldOption[]>(() => [
  { title: t('hash-function-form.select-option-text'), value: 'text' },
  { title: t('hash-function-form.select-option-hex'), value: 'hex' },
])

const form = reactive({
  type: decodeOptions.value[0].value as DecodeType,
  text: '',
})
const rules = computed(() => ({
  type: { required },
  text: {
    ...(form.type === 'hex' && { required, hexadecimal }),
  },
}))

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  rules,
)

const decodedHash = ref(props.decode(form.text, form.type))

watch(form, () => {
  if (!isFormValid()) {
    decodedHash.value = ''
    return
  }

  try {
    decodedHash.value = props.decode(form.text, form.type)
  } catch (error) {
    decodedHash.value = ''
    ErrorHandler.process(error)
  }
})
</script>

<style lang="scss" scoped>
.hash-function-form {
  @include solidity-tools-form;
}

.hash-function-form__output,
.hash-function-form__input {
  @include solidity-tools-form-part;
}

.hash-function-form__divider {
  @include solidity-tools-form-divider;
}

.hash-function-form__title-wrp {
  display: flex;
  align-items: baseline;
  gap: inherit;
  flex-wrap: wrap;
}

.hash-function-form__title {
  margin-right: auto;
  min-width: max-content;
}

.hash-function-form .hash-function-form__radio-button-field {
  @include respond-to(small) {
    width: 100%;
  }
}

.hash-function-form__output-item-label {
  @include field-label;
}

.hash-function-form__output-item-value {
  @include text-ellipsis;
}
</style>
