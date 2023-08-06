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
    <div
      v-if="isDecoding || errorMessage || form.args.length"
      class="abi-decode-form__output"
    >
      <loader v-if="isDecoding" />
      <template v-else>
        <p v-if="errorMessage" class="abi-decode-form__error-msg">
          {{ $t('abi-decode-form.error-msg', { msg: errorMessage }) }}
        </p>
        <template v-if="form.args.length">
          <h2>{{ $t('abi-decode-form.output-title') }}</h2>
          <div class="abi-decode-form__args_wrp">
            <div
              v-for="(arg, idx) in form.args"
              :key="arg.id"
              class="abi-decode-form__arg"
            >
              <select-field
                v-model="arg.type"
                :readonly="form.decodeMode === DECODE_MODES.auto"
                :label="$t('abi-decode-form.arg-type-label')"
                :placeholder="$t('abi-decode-form.arg-type-placeholder')"
                :value-options="
                  Object.values(ETHEREUM_TYPES).map(v => ({
                    value: v,
                    title: v,
                  }))
                "
                :error-message="getFieldErrorMessage(`args[${idx}].type`)"
                @blur="touchField('args')"
              />
              <input-field
                v-model="arg.value"
                readonly
                :is-clearable="form.decodeMode === DECODE_MODES.manual"
                :label="$t('abi-decode-form.arg-value-label')"
                :placeholder="$t('abi-decode-form.arg-value-placeholder')"
                @clear="removeArg(arg.id)"
              />
            </div>
          </div>
        </template>
      </template>
    </div>
    <app-button
      v-if="form.decodeMode === DECODE_MODES.manual"
      class="abi-decode-form__add-arg-btn"
      scheme="none"
      :text="$t('abi-decode-form.add-arg-btn')"
      :icon-left="$icons.plus"
      @click="addArg"
    />
  </form>
</template>

<script lang="ts" setup>
import { AppButton, Loader } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import {
  CheckboxField,
  InputField,
  RadioButtonField,
  SelectField,
  TextareaField,
} from '@/fields'
import { ErrorHandler, hex, required } from '@/helpers'
import { type FieldOption } from '@/types'
import { guessAbiEncodedData, guessFragment } from '@openchainxyz/abi-guesser'
import { AbiCoder, FunctionFragment } from 'ethers'
import { debounce } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

type DecodedData = {
  types: string[]
  values: string[]
}

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

const errorMessage = ref('')
const isDecoding = ref(false)

const addArg = () => form.args.push({ id: uuidv4(), type: '', value: '' })
const removeArg = (id: FuncArg['id']) => {
  form.args = form.args.filter(arg => arg.id !== id)
}

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
  args: [] as FuncArg[],
})
const rules = computed(() => ({
  abiEncoding: { required, hex },
  decodeMode: { required },
  args: {
    ...form.args.reduce(
      (acc, _, idx) => ({
        ...acc,
        [idx]: { type: { required } },
      }),
      {},
    ),
  },
}))

const { getFieldErrorMessage, isFieldsValid, isFormValid, touchField } =
  useFormValidation(form, rules)

const fetchFuncSignature = async (selector: string): Promise<string> => {
  const url = 'https://api.openchain.xyz/signature-database/v1/lookup'
  const query = `function=${selector}`

  const response = await (await fetch(`${url}?${query}`)).json()
  if (!response.ok) throw new Error(response.error)

  return response.result.function[selector]?.[0]?.name || ''
}

const decode = async (): Promise<DecodedData> => {
  isDecoding.value = true

  let types: DecodedData['types'] = []
  let values: DecodedData['values'] = []

  try {
    switch (true) {
      case form.decodeMode === DECODE_MODES.auto && form.hasFuncSelector: {
        const funcSelector = form.abiEncoding.substring(0, 10)
        const funcData = '0x' + form.abiEncoding.substring(10)

        const funcSignature = await fetchFuncSignature(funcSelector)

        const funcFragment = funcSignature
          ? FunctionFragment.from(funcSignature)
          : guessFragment(form.abiEncoding)
        if (!funcFragment) throw new Error('failed guess fragment')

        types = funcFragment.inputs.map(paramType => paramType.format())
        values = AbiCoder.defaultAbiCoder().decode(types, funcData)

        break
      }

      case form.decodeMode === DECODE_MODES.auto: {
        const paramTypes = guessAbiEncodedData(form.abiEncoding)
        if (!paramTypes) throw new Error('failed guess params types')

        types = paramTypes.map(type => type.format())
        values = AbiCoder.defaultAbiCoder().decode(types, form.abiEncoding)

        break
      }

      case form.decodeMode === DECODE_MODES.manual && form.hasFuncSelector: {
        const funcData = '0x' + form.abiEncoding.substring(10)

        types = form.args.map(arg => arg.type)
        values = AbiCoder.defaultAbiCoder().decode(types, funcData)

        break
      }

      case form.decodeMode === DECODE_MODES.manual: {
        types = form.args.map(arg => arg.type)
        values = AbiCoder.defaultAbiCoder().decode(types, form.abiEncoding)
      }
    }

    return { types, values }
  } finally {
    isDecoding.value = false
  }
}

let _formStateJsonString = ''
const onFormChange = async () => {
  // to avoid re-decoding,because form can change on decode
  if (JSON.stringify(form) === _formStateJsonString) return

  if (!isFormValid()) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    errorMessage.value = ''
    return
  }

  try {
    const { types, values } = await decode()

    form.args = types.map((type, idx) => ({
      id: form.args[idx]?.id || uuidv4(),
      type: type,
      value: String(values[idx]),
    }))

    errorMessage.value = ''
  } catch (error) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    else form.args = form.args.map(arg => ({ ...arg, value: '' }))

    errorMessage.value =
      error instanceof Error
        ? error.message
        : t('abi-decode-form.error-msg--unknown')

    ErrorHandler.process(error)
  }

  _formStateJsonString = JSON.stringify(form)
}

watch([form, isFieldsValid], debounce(onFormChange, 500))
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
  word-break: break-all;
}

.abi-decode-form__add-arg-btn {
  padding: toRem(12) toRem(16);
}
</style>
