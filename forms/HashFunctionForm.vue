<template>
  <form class="hash-function-form">
    <div class="hash-function-form__input">
      <h3>{{ $t('hash-function-form.input-title', { type: title }) }}</h3>
      <select-field
        v-model="form.type"
        :label="$t('hash-function-form.type-title')"
        :value-options="decodeTitles"
        :error-message="getFieldErrorMessage('type')"
        @blur="touchField('type')"
      />
      <textarea-field
        v-model="form.text"
        :label="$t('hash-function-form.text-title')"
        :error-message="getFieldErrorMessage('text')"
        @blur="touchField('text')"
      />
    </div>
    <div class="hash-function-form__output">
      <h3>{{ $t('hash-function-form.output-title') }}</h3>
      <input-field
        readonly
        :model-value="decodedHash"
        :label="$t('hash-function-form.decoded-hash-label')"
        :placeholder="$t('hash-function-form.decoded-hash-placeholder')"
      >
        <template #nodeRight>
          <copy :value="decodedHash" />
        </template>
      </input-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { Copy } from '#components'
import { useFormValidation } from '@/composables'
import { InputField, SelectField, TextareaField } from '@/fields'
import { required, hex, minLength, ErrorHandler } from '@/helpers'
import { type DecodeType, type HashFunction } from '@/types'
import { reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

const props = defineProps<{
  title: string
  decode: HashFunction
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
</style>
