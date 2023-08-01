<template>
  <form class="abi-decode-form">
    <div class="abi-decode-form__input">
      <h2>{{ title }}</h2>
      <textarea-field
        v-model="form.abiEncoding"
        :label="$t('abi-decode-form.abi-encoding-label')"
        :placeholder="$t('abi-decode-form.abi-encoding-placeholder')"
        :error-message="getFieldErrorMessage('abiEncoding')"
        @blur="touchField('abiEncoding')"
      />
      <checkbox-field
        v-model="form.hasFuncSelector"
        :label="$t('abi-decode-form.has-func-selector-label')"
      />
      <radio-button-field
        v-model="form.paramsOption"
        :options="paramsOptions"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useFormValidation } from '@/composables'
import { CheckboxField, RadioButtonField, TextareaField } from '@/fields'
import { required, hex } from '@/helpers'
import { type FieldOption } from '@/types'
import { computed, reactive } from 'vue'
import { i18n } from '~/plugins/localization'

enum PARAMS_OPTIONS_IDS {
  auto = 'auto',
  manually = 'manually',
}

const { t } = i18n.global

const paramsOptions = computed<FieldOption[]>(() => [
  {
    id: PARAMS_OPTIONS_IDS.auto,
    title: t('abi-decode-form.params-option-title--auto'),
  },
  {
    id: PARAMS_OPTIONS_IDS.manually,
    title: t('abi-decode-form.params-option-title--manually'),
  },
])

const form = reactive({
  abiEncoding: '',
  hasFuncSelector: false,
  paramsOption: paramsOptions.value[0],
})
const rules = computed(() => ({
  abiEncoding: { required, hex },
  paramsOption: { required },
}))

const { getFieldErrorMessage, isFieldsValid, touchField } = useFormValidation(
  form,
  rules,
)

defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.abi-decode-form {
  display: grid;
  gap: toRem(40);
}

.abi-decode-form__output,
.abi-decode-form__input {
  display: grid;
  gap: toRem(20);
}

.abi-decode-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--text-secondary-main);
}
</style>
