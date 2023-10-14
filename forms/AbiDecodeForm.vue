<template>
  <form class="abi-decode-form">
    <div class="abi-decode-form__input">
      <div class="abi-decode-form__title-wrp">
        <h3>{{ $t('abi-decode-form.input-title') }}</h3>
        <div class="abi-decode-form__options-wrp">
          <checkbox-field
            v-model="form.hasFuncSelector"
            class="abi-decode-form__checkbox-field"
            :label="$t('abi-decode-form.has-func-selector-label')"
          />
          <radio-button-field
            v-model="form.decodeMode"
            class="abi-decode-form__radio-button-field"
            :options="decodeModeOptions"
          />
        </div>
      </div>
      <textarea-field
        v-model="form.abiEncoding"
        :label="$t('abi-decode-form.abi-encoding-label')"
        :placeholder="$t('abi-decode-form.abi-encoding-placeholder')"
        :error-message="getFieldErrorMessage('abiEncoding')"
        @blur="touchField('abiEncoding')"
      />
    </div>
    <div class="abi-decode-form__output">
      <input-field
        v-model="form.funcSignature"
        :readonly="form.decodeMode === DECODE_MODES.auto"
        :label="$t('abi-decode-form.func-signature-label')"
        :placeholder="$t('abi-decode-form.func-signature-placeholder')"
        :error-message="getFieldErrorMessage('funcSignature')"
        @blur="touchField('funcSignature')"
      />
      <app-loader v-if="isDecoding" />
      <template v-else>
        <div v-if="errorMessage" class="abi-decode-form__msg-wrp">
          <app-icon
            :class="['abi-decode-form__icon', 'abi-decode-form__icon--error']"
            :name="$icons.exclamationCircle"
          />
          <p :class="['abi-decode-form__msg', 'abi-decode-form__msg--error']">
            {{ errorMessage }}
          </p>
        </div>
        <template v-else>
          <div v-if="warningMessage" class="abi-decode-form__msg-wrp">
            <app-icon
              :class="[
                'abi-decode-form__icon',
                'abi-decode-form__icon--warning',
              ]"
              :name="$icons.exclamationTriangle"
            />
            <p
              :class="['abi-decode-form__msg', 'abi-decode-form__msg--warning']"
            >
              {{ warningMessage }}
            </p>
          </div>
          <div v-if="funcArgs.length" class="abi-decode-form__args_wrp">
            <div
              v-for="funcArg in funcArgs"
              :key="funcArg.id"
              class="abi-decode-form__arg"
            >
              <autocomplete-field
                v-model="funcArg.type"
                modification="dropup"
                readonly
                :label="$t('abi-decode-form.arg-type-label')"
                :placeholder="$t('abi-decode-form.arg-type-placeholder')"
                :options="TYPE_OPTIONS"
              />
              <div
                v-if="funcArg.type === ETHEREUM_TYPES.tuple"
                class="abi-decode-form__tuple"
              >
                <input-field
                  readonly
                  :model-value="funcArg.subtype"
                  :label="$t('abi-decode-form.arg-subtype-label')"
                  :placeholder="
                    $t('abi-decode-form.arg-subtype-placeholder--tuple')
                  "
                />
                <textarea-field
                  v-model="funcArg.value"
                  size="small"
                  readonly
                  :placeholder="$t('abi-decode-form.arg-value-placeholder')"
                >
                  <template #nodeRight>
                    <app-copy :value="funcArg.value" />
                  </template>
                </textarea-field>
              </div>
              <textarea-field
                v-else
                v-model="funcArg.value"
                size="small"
                readonly
                :label="$t('abi-decode-form.arg-value-label')"
                :placeholder="$t('abi-decode-form.arg-value-placeholder')"
              >
                <template #nodeRight>
                  <app-copy :value="funcArg.value" />
                </template>
              </textarea-field>
            </div>
          </div>
        </template>
      </template>
    </div>
    <app-button
      v-if="funcArgs.length && isDecoded"
      :text="$t('abi-decode-form.abi-decoding-copy-btn')"
      @click="copyDecodedValues"
    />
  </form>
</template>

<script lang="ts" setup>
import { AppButton, AppCopy, AppIcon, AppLoader } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import { errors } from '@/errors'
import {
  AutocompleteField,
  CheckboxField,
  InputField,
  RadioButtonField,
  TextareaField,
} from '@/fields'
import {
  ErrorHandler,
  bytes,
  checkIsBigInt,
  copyToClipboard,
  createFunctionSignature,
  functionSignature,
  getErrorMessage,
  parseFuncArgToValueOfEncode,
  required,
} from '@/helpers'
import { type ArrayElement, type FieldOption } from '@/types'
import { fetcher } from '@distributedlab/fetcher'
import { guessAbiEncodedData, guessFragment } from '@openchainxyz/abi-guesser'
import { AbiCoder, FunctionFragment, ParamType } from 'ethers'
import { without } from 'lodash-es'
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

const TYPE_OPTIONS: FieldOption[] = without(
  Object.values(ETHEREUM_TYPES),
  ETHEREUM_TYPES.uint,
  ETHEREUM_TYPES.uintArray,
).map(v => ({
  value: v,
  title: v,
}))

const DEFAULT_FUNCTION_NAME = 'function'
const { t } = i18n.global

const funcArgs = ref<FuncArg[]>([])

const errorMessage = ref('')
const warningMessage = ref('')

const isDecoding = ref(false)
const isDecoded = ref(false)

const formatArgSubtype = (subtype: FuncArg['subtype']) => {
  return subtype.startsWith('(') ? `tuple${subtype}` : subtype
}

const copyDecodedValues = () => {
  const values = funcArgs.value.map(parseFuncArgToValueOfEncode)
  copyToClipboard(JSON.stringify(values))
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
  funcSignature: '',
  hasFuncSelector: false,
  decodeMode: decodeModeOptions.value[0].value,
})
const rules = computed(() => ({
  abiEncoding: { required, bytes },
  decodeMode: { required },
  funcSignature:
    form.decodeMode === DECODE_MODES.manual ? { functionSignature } : {},
}))

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  rules,
)

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
  ...[types, data, loose]: Parameters<AbiCoder['decode']>
): ReturnType<AbiCoder['decode']> => {
  try {
    const values = AbiCoder.defaultAbiCoder().decode(types, data, loose)

    // values is a Proxy with trap of a getting, access check required
    for (const idx in types) values[idx]

    return values
  } catch {
    throw new errors.AbiDecodeError()
  }
}

const decodeAbi = async (data: string): Promise<DecodedData> => {
  isDecoding.value = true
  isDecoded.value = false

  let types: DecodedData['types'] = []
  let values: DecodedData['values'] = []

  try {
    switch (form.decodeMode) {
      case DECODE_MODES.auto: {
        if (form.hasFuncSelector) {
          const funcSelector = data.substring(0, 10)
          const funcData = '0x' + data.substring(10)

          let funcFragment
          let funcSignature

          try {
            funcSignature = await fetchFuncSignature(funcSelector)
            funcFragment = FunctionFragment.from(funcSignature)
          } catch (error) {
            funcFragment = guessFragment(data)
            if (!funcFragment) throw new errors.FunctionFragmentGuessError()

            funcSignature = createFunctionSignature(
              funcFragment.inputs as unknown as ParamType[],
              DEFAULT_FUNCTION_NAME,
            )

            warningMessage.value = t('abi-decode-form.func-is-guessed-warning')
          }

          updateSafelyFuncSignature(funcSignature)

          types = funcFragment.inputs.map(paramType => paramType.format())
          values = decodeValues(types, funcData)

          break
        }

        const paramTypes = guessAbiEncodedData(data)
        if (!paramTypes) throw new errors.ParamTypesGuessError()

        const funcSignature = createFunctionSignature(
          paramTypes as unknown as ParamType[],
          'constructor',
        )

        updateSafelyFuncSignature(funcSignature)

        types = paramTypes.map(type => type.format())
        values = decodeValues(types, data)

        break
      }

      case DECODE_MODES.manual: {
        const funcFragment = FunctionFragment.from(form.funcSignature)
        const funcData = form.hasFuncSelector ? '0x' + data.substring(10) : data

        types = funcFragment.inputs.map(paramType => paramType.format())
        values = decodeValues(types, funcData)

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

const updateSafelyFuncSignature = (funcSignature: string) => {
  formStateJsonString = JSON.stringify({ ...form, funcSignature })
  form.funcSignature = funcSignature
}

const resetOutput = () => {
  warningMessage.value = ''
  funcArgs.value.length = 0
  isDecoded.value = false
  errorMessage.value = ''

  if (form.decodeMode === DECODE_MODES.auto) {
    updateSafelyFuncSignature('')
  }
}

let formStateJsonString = JSON.stringify(form)
const onFormChange = async () => {
  // to avoid re-decoding,because form can change on decode
  if (JSON.stringify(form) === formStateJsonString) return
  formStateJsonString = JSON.stringify(form)

  resetOutput()
  if (!isFormValid()) return

  try {
    const { types, values } = await decodeAbi(form.abiEncoding)

    funcArgs.value = types.map((type, idx) => ({
      id: funcArgs.value[idx]?.id || uuidv4(),
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
    resetOutput()

    errorMessage.value = getErrorMessage(error)
    ErrorHandler.processWithoutFeedback(error)
  }
}

watch(() => form, onFormChange, { deep: true })
</script>

<style lang="scss" scoped>
.abi-decode-form {
  display: grid;
  grid-gap: toRem(32);

  @include respond-to(medium) {
    grid-gap: toRem(24);
  }
}

.abi-decode-form__output,
.abi-decode-form__input {
  @include solidity-tools-form-part;
}

.abi-decode-form__title-wrp {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: inherit;
  flex-wrap: wrap;
}

.abi-decode-form__options-wrp {
  display: flex;
  align-items: center;
  gap: toRem(8);

  @include respond-to(small) {
    flex-direction: column;
    width: 100%;
  }
}

.abi-decode-form .abi-decode-form__checkbox-field,
.abi-decode-form .abi-decode-form__radio-button-field {
  @include respond-to(small) {
    width: 100%;
  }
}

.abi-decode-form__args_wrp {
  display: grid;
  grid-gap: inherit;
}

.abi-decode-form__arg {
  display: grid;
  grid-template-columns: minmax(toRem(150), 20%) 1fr;
  grid-gap: toRem(16);

  @include respond-to(small) {
    grid-template-columns: auto;
    grid-gap: toRem(8);
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
</style>
