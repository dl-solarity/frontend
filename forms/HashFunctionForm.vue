<template>
  <form class="hash-function-form">
    <div class="hash-function-form__input">
      <h2 class="hash-function-form__input-title">
        {{ $t('hash-function-form.input-title', { type: title }) }}
      </h2>
      <div class="hash-function-form__input-fields">
        <select-field
          v-model="form.type"
          :label="$t('hash-function-form.type-title')"
          :value-options="decodeTitles"
          :disabled="isFormDisabled"
          :error-message="getFieldErrorMessage('type')"
          @blur="touchField('type')"
        />
        <textarea-field
          v-model="form.text"
          :label="$t('hash-function-form.text-title')"
          :disabled="isFormDisabled"
          :error-message="getFieldErrorMessage('text')"
          @blur="touchField('text')"
        />
      </div>
    </div>
    <div class="hash-function-form__output">
      <h2 class="hash-function-form__output-title">
        {{ $t('hash-function-form.output-title') }}
      </h2>
      <div class="hash-function-form__output-content">
        <div class="hash-function-form__output-content-item">
          <p class="hash-function-form__output-content-item-title">
            {{ $t('hash-function-form.decoded-hash-title') }}
          </p>
          <copy :value="decodedHash">
            <p class="hash-function-form__output-content-item-value">
              {{ decodedHash || '–' }}
            </p>
          </copy>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { required, hex, minLength, ErrorHandler } from '@/helpers'
import { TextareaField, SelectField } from '@/fields'
import { useForm, useFormValidation } from '@/composables'
import { i18n } from '~/plugins/localization'
import { DecodeType } from '@/types'

const props = defineProps<{
  title: string
  decode: (str: string, type: DecodeType) => string
}>()

const { t } = i18n.global

const decodeTitles = computed(() => [
  { title: t('hash-function-form.select-option-text'), value: 'text' },
  { title: t('hash-function-form.select-option-hex'), value: 'hex' },
])

const decodedHash = ref('')
const form = reactive({
  type: decodeTitles.value[0].value as DecodeType,
  text: '',
})

const { isFormDisabled } = useForm()
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
  border-bottom: toRem(1) solid var(--text-secondary-main);
}

.hash-function-form__input-fields {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.hash-function-form__output-content {
  display: grid;
  gap: toRem(32);
}

.hash-function-form__output-content-item {
  display: grid;
  gap: toRem(4);
}

.hash-function-form__output-content-item-title {
  color: var(--text-primary-main);
  line-height: 1.4;
}

.hash-function-form__output-content-item-value {
  font-size: toRem(18);
  line-height: 1.4;

  @include text-ellipsis;
}
</style>
