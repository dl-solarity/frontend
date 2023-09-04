<template>
  <form class="hash-function-form">
    <div class="hash-function-form__input">
      <div class="hash-function-form__title-wrp">
        <h3 class="hash-function-form__title">
          {{ $t('hash-function-form.input-title', { type: title }) }}
        </h3>
        <radio-button-field v-model="form.type" :options="decodeOptions" />
      </div>
      <textarea-field
        v-model="form.text"
        :label="$t('hash-function-form.text-title')"
        :error-message="getFieldErrorMessage('text')"
        @blur="touchField('text')"
      />
    </div>
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
import { hex, minLength, required, ErrorHandler } from '@/helpers'
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

const decodedHash = ref('')
const form = reactive({
  type: decodeOptions.value[0].value as DecodeType,
  text: '',
})

const rules = computed(() => ({
  type: { required },
  text: {
    ...(form.type === 'hex'
      ? { required, hex, minLength: minLength(3) }
      : { required }),
  },
}))
const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  rules,
)

watch(form, () => {
  if (!isFormValid()) {
    decodedHash.value = ''
    return
  }
  try {
    decodedHash.value = props.decode(form.text, form.type)
  } catch (error) {
    decodedHash.value = ''
    ErrorHandler.processWithoutFeedback(error)
  }
})
</script>

<style lang="scss" scoped>
.hash-function-form {
  display: grid;
  gap: toRem(40);
}

.hash-function-form__output,
.hash-function-form__input {
  display: grid;
  gap: toRem(20);
}

.hash-function-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--border-primary-main);
}

.hash-function-form__title-wrp {
  display: flex;
  align-items: center;
  gap: inherit;
  flex-wrap: wrap;
}

.hash-function-form__title {
  margin-right: auto;
  min-width: max-content;
}

.hash-function-form__output-item-label {
  @include field-label;
}

.hash-function-form__output-item-value {
  @include text-ellipsis;
}
</style>
