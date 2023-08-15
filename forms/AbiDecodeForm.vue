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
        <div v-if="errorMessage" class="abi-decode-form__msg-wrp">
          <icon
            :class="['abi-decode-form__icon', 'abi-decode-form__icon--error']"
            :name="$icons.exclamationCircle"
          />
          <p :class="['abi-decode-form__msg', 'abi-decode-form__msg--error']">
            {{ errorMessage }}
          </p>
        </div>
        <div v-if="warningMessage" class="abi-decode-form__msg-wrp">
          <icon
            :class="['abi-decode-form__icon', 'abi-decode-form__icon--warning']"
            :name="$icons.exclamationCircle"
          />
          <p :class="['abi-decode-form__msg', 'abi-decode-form__msg--warning']">
            {{ warningMessage }}
          </p>
        </div>
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
                modification="dropup"
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
              <div
                v-if="arg.type === ETHEREUM_TYPES.tuple"
                class="abi-decode-form__tuple"
              >
                <input-field
                  :model-value="arg.subtype"
                  :readonly="form.decodeMode === DECODE_MODES.auto"
                  :is-clearable="form.decodeMode === DECODE_MODES.manual"
                  :label="$t('abi-decode-form.arg-subtype-label')"
                  :placeholder="
                    $t('abi-decode-form.arg-subtype-placeholder--tuple')
                  "
                  :error-message="getFieldErrorMessage(`args[${idx}].subtype`)"
                  @blur="touchField(`args[${idx}].subtype`)"
                  @clear="removeArg(arg.id)"
                  @update:model-value="
                    newValue => onArgSubtypeUpdate(newValue as string, idx)
                  "
                />
                <input-field
                  v-model="arg.value"
                  readonly
                  :placeholder="$t('abi-decode-form.arg-value-placeholder')"
                />
              </div>
              <input-field
                v-else
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
    <div v-if="hasButtons" class="abi-decode-form__buttons">
      <template v-if="form.decodeMode === DECODE_MODES.manual">
        <app-button
          scheme="none"
          :text="$t('abi-decode-form.add-arg-btn')"
          :icon-left="$icons.plus"
          @click="addArg"
        />
        <app-button
          v-if="form.args.length && isDecoded"
          scheme="none"
          :text="$t('abi-decode-form.abi-decoding-copy-btn')"
          @click="copyDecodedValues"
        />
      </template>
      <app-button
        v-else-if="form.args.length && isDecoded"
        :text="$t('abi-decode-form.abi-decoding-copy-btn')"
        @click="copyDecodedValues"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppButton, Icon, Loader } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import { errors } from '@/errors'
import {
  CheckboxField,
  InputField,
  RadioButtonField,
  SelectField,
  TextareaField,
} from '@/fields'
import {
  ErrorHandler,
  bytes,
  checkIsBigInt,
  copyToClipboard,
  ethereumBaseType,
  getErrorMessage,
  parseFuncArgToValueOfEncode,
  required,
} from '@/helpers'
import { type ArrayElement, type FieldOption } from '@/types'
import { fetcher } from '@distributedlab/fetcher'
import { guessAbiEncodedData, guessFragment } from '@openchainxyz/abi-guesser'
import { AbiCoder, FunctionFragment } from 'ethers'
import { debounce } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

type DecodedData = {
  types: string[]
  values: unknown[]
}

type FuncArg = {
  id: string
  type: string
  subtype: string
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
const warningMessage = ref('')

const isDecoding = ref(false)
const isDecoded = ref(false)

const addArg = () =>
  form.args.push({ id: uuidv4(), type: '', subtype: '', value: '' })
const removeArg = (id: FuncArg['id']) => {
  form.args = form.args.filter(arg => arg.id !== id)
}

const formatArgSubtype = (subtype: FuncArg['subtype']) => {
  return subtype.startsWith('(') ? `tuple${subtype}` : subtype
}
const onArgSubtypeUpdate = (newValue: FuncArg['subtype'], argIdx: number) => {
  form.args[argIdx].subtype = formatArgSubtype(newValue)
}

const copyDecodedValues = () => {
  copyToClipboard(JSON.stringify(form.args.map(parseFuncArgToValueOfEncode)))
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

const hasButtons = computed<boolean>(() =>
  Boolean(
    form.decodeMode === DECODE_MODES.manual ||
      (form.args.length && isDecoded.value),
  ),
)

const form = reactive({
  abiEncoding: '',
  hasFuncSelector: false,
  decodeMode: decodeModeOptions.value[0].value,
  args: [] as FuncArg[],
})
const rules = computed(() => ({
  abiEncoding: { required, bytes },
  decodeMode: { required },
  args: {
    ...form.args.reduce(
      (acc, arg, idx) => ({
        ...acc,
        [idx]: {
          type: { required },
          subtype: {
            ...(arg.type === ETHEREUM_TYPES.tuple && {
              required,
              ethereumBaseType: ethereumBaseType('tuple'),
            }),
          },
        },
      }),
      {},
    ),
  },
}))

const { getFieldErrorMessage, isFieldsValid, isFormValid, touchField } =
  useFormValidation(form, rules)

const fetchFuncSignature = async (selector: string): Promise<string> => {
  let responseData
  try {
    const { data } = await fetcher.get(
      'https://api.openchain.xyz/signature-database/v1/lookup',
      { query: { function: selector } },
    )

    responseData = data
  } catch {
    throw new errors.FunctionSignatureFetchError()
  }

  // eslint-disable-next-line
  // @ts-ignore
  return responseData?.result?.function[selector]?.[0]?.name || ''
}

const decodeValues = (
  ...params: Parameters<AbiCoder['decode']>
): ReturnType<AbiCoder['decode']> => {
  try {
    const values = AbiCoder.defaultAbiCoder().decode(...params)

    // values is a Proxy with a get trap, checking access is required
    for (const idx of values) values[idx]

    return values
  } catch {
    throw new errors.AbiDecodeError()
  }
}

const decodeAbi = async (): Promise<DecodedData> => {
  isDecoding.value = true
  isDecoded.value = false

  let types: DecodedData['types'] = []
  let values: DecodedData['values'] = []

  try {
    switch (form.decodeMode) {
      case DECODE_MODES.auto: {
        if (form.hasFuncSelector) {
          const funcSelector = form.abiEncoding.substring(0, 10)
          const funcData = '0x' + form.abiEncoding.substring(10)

          let funcFragment
          try {
            funcFragment = FunctionFragment.from(
              await fetchFuncSignature(funcSelector),
            )
          } catch {
            funcFragment = guessFragment(form.abiEncoding)
            if (!funcFragment) throw new errors.FunctionFragmentGuessError()
            warningMessage.value = t('abi-decode-form.func-is-guessed-warning')
          }

          types = funcFragment.inputs.map(paramType => paramType.format())
          values = decodeValues(types, funcData)

          break
        }

        const paramTypes = guessAbiEncodedData(form.abiEncoding)
        if (!paramTypes) throw new errors.ParamTypesGuessError()

        types = paramTypes.map(type => type.format())
        values = decodeValues(types, form.abiEncoding)

        break
      }

      case DECODE_MODES.manual: {
        const data = form.hasFuncSelector
          ? '0x' + form.abiEncoding.substring(10)
          : form.abiEncoding

        types = form.args.map(arg =>
          arg.type === ETHEREUM_TYPES.tuple ? arg.subtype : arg.type,
        )
        values = decodeValues(types, data)

        break
      }

      default:
        throw new Error('case for decode not found')
    }

    isDecoded.value = true
    return { types, values }
  } finally {
    isDecoding.value = false
  }
}

const formatValue = (value: ArrayElement<DecodedData['values']>): string => {
  if (value instanceof Array) {
    const values = value.map(v => (checkIsBigInt(v) ? v.toString() : v))
    return JSON.stringify(values)
  }

  return String(value)
}

let _formStateJsonString = ''
const onFormChange = async () => {
  // to avoid re-decoding,because form can change on decode
  if (JSON.stringify(form) === _formStateJsonString) return

  warningMessage.value = ''

  if (!isFormValid()) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    else form.args = form.args.map(arg => ({ ...arg, value: '' }))
    isDecoded.value = false
    errorMessage.value = ''
    return
  }

  try {
    const { types, values } = await decodeAbi()

    form.args = types.map((type, idx) => ({
      id: form.args[idx]?.id || uuidv4(),
      ...(type.includes('tuple') || type.startsWith('(')
        ? {
            type: ETHEREUM_TYPES.tuple,
            subtype: formatArgSubtype(type),
          }
        : { type, subtype: '' }),
      value: formatValue(values[idx]),
    }))

    errorMessage.value = ''
  } catch (error) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    else form.args = form.args.map(arg => ({ ...arg, value: '' }))

    errorMessage.value = getErrorMessage(error)
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
  border-bottom: toRem(1) solid var(--border-primary-main);
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

.abi-decode-form__msg-wrp {
  display: flex;
  align-items: center;
  gap: toRem(8);
}

.abi-decode-form__icon {
  height: toRem(22);
  width: toRem(22);

  &--error {
    color: var(--error-main);
  }

  &--warning {
    color: var(--warning-main);
  }
}

.abi-decode-form__msg {
  word-break: break-all;

  &--error {
    color: var(--error-main);
  }

  &--warning {
    color: var(--warning-main);
  }
}

.abi-decode-form__tuple {
  display: grid;
  grid-gap: toRem(16);
}

.abi-decode-form__buttons {
  display: grid;
  grid-auto-flow: column;
  grid-gap: toRem(16);
  max-width: max-content;
}
</style>
