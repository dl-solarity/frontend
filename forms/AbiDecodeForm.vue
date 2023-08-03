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
        v-model="form.decodeMode"
        :options="decodeModeOptions"
      />
    </div>
    <div v-if="args.length || errorMessage" class="abi-decode-form__output">
      <template v-if="args.length">
        <h2>{{ $t('abi-decode-form.output-title') }}</h2>
        <div class="abi-decode-form__args_wrp">
          <div v-for="arg in args" :key="arg.id" class="abi-decode-form__arg">
            <select-field
              v-model="arg.type"
              :readonly="form.decodeMode === DECODE_MODES.auto"
              :label="$t('abi-decode-form.arg-type-label')"
              :placeholder="$t('abi-decode-form.arg-type-placeholder')"
              :value-options="
                Object.values(ETHEREUM_TYPES).map(v => ({ value: v, title: v }))
              "
            />
            <input-field
              v-model="arg.value"
              readonly
              :label="$t('abi-decode-form.arg-value-label')"
              :placeholder="$t('abi-decode-form.arg-value-placeholder')"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <p class="abi-decode-form__error-msg">
          {{ $t('abi-decode-form.error-msg', { msg: errorMessage }) }}
        </p>
      </template>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import {
  CheckboxField,
  InputField,
  RadioButtonField,
  SelectField,
  TextareaField,
} from '@/fields'
import { ErrorHandler, required, hex } from '@/helpers'
import { type FieldOption } from '@/types'
import { guessAbiEncodedData } from '@openchainxyz/abi-guesser'
import { AbiCoder } from 'ethers'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

type FuncArg = {
  id: string
  type: string
  value: string
}

enum DECODE_MODES {
  auto = 'auto',
  manual = 'manual',
}

defineProps<{
  title: string
}>()

const { t } = i18n.global

const args = ref<FuncArg[]>([])
const errorMessage = ref('')

const decodeModeOptions = computed<FieldOption[]>(() => [
  {
    value: DECODE_MODES.auto,
    title: t('abi-decode-form.decode-mode-option-title--auto'),
  },
  {
    value: DECODE_MODES.manual,
    title: t('abi-decode-form.decode-mode-option-title--manual'),
  },
])

const form = reactive({
  abiEncoding: '',
  hasFuncSelector: false,
  decodeMode: decodeModeOptions.value[0].value,
})
const rules = computed(() => ({
  abiEncoding: { required, hex },
  decodeMode: { required },
}))

const { getFieldErrorMessage, isFieldsValid, touchField } = useFormValidation(
  form,
  rules,
)

const decode = () => {
  let types: string[] = []

  if (form.decodeMode === DECODE_MODES.auto) {
    const paramTypes = guessAbiEncodedData(form.abiEncoding)
    if (!paramTypes) throw new Error('failed guess params types')

    types = paramTypes.map(type => type.format())
  }

  const values = AbiCoder.defaultAbiCoder().decode(types, form.abiEncoding)

  args.value = types.map((type, idx) => ({
    id: uuidv4(),
    type: type,
    value: String(values[idx]),
  }))
}

const onFormChange = () => {
  if (!isFieldsValid.value) {
    args.value.length = 0
    errorMessage.value = ''
    return
  }

  try {
    decode()
    errorMessage.value = ''
  } catch (error) {
    args.value.length = 0
    errorMessage.value =
      error instanceof Error ? error.message : t('abi-decode-form.error-msg--unknown')
    ErrorHandler.process(error)
  }
}

watch(form, onFormChange)
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

.abi-decode-form__args_wrp {
  display: grid;
  grid-gap: toRem(16);

  @include respond-to(small) {
    grid-gap: toRem(48);
  }
}

.abi-decode-form__arg {
  display: grid;
  grid-gap: toRem(16);
  grid-template-columns: minmax(toRem(140), 20%) 1fr;

  @include respond-to(small) {
    grid-template-columns: auto;
  }
}

.abi-decode-form__error-msg {
  color: var(--error-main);
}
</style>
