<template>
  <form class="abi-encode-form" @submit.prevent>
    <div class="abi-encode-form__input">
      <div class="abi-encode-form__title-wrp">
        <h3>{{ $t('abi-encode-form.input-title') }}</h3>
        <radio-button-field
          v-model="form.encodeMode"
          class="abi-encode-form__radio-button-field"
          :options="ENCODE_MODE_OPTIONS"
        />
      </div>
      <input-field
        :model-value="
          form.encodeMode === ENCODE_MODES.standard ? form.funcName : ''
        "
        :readonly="form.encodeMode === ENCODE_MODES.packed"
        :label="$t('abi-encode-form.func-name-label')"
        :placeholder="$t('abi-encode-form.func-name-placeholder')"
        :error-message="getFieldErrorMessage('funcName')"
        @blur="touchField('funcName')"
        @update:model-value="form.funcName = $event as string"
      />
      <div v-if="form.args.length" class="abi-encode-form__args_wrp">
        <div
          v-for="(arg, idx) in form.args"
          :key="arg.id"
          class="abi-encode-form__arg"
        >
          <autocomplete-field
            v-model="arg.type"
            :label="$t('abi-encode-form.arg-type-label')"
            :placeholder="$t('abi-encode-form.arg-type-placeholder')"
            :options="TYPE_OPTIONS"
            :error-message="getFieldErrorMessage(`args[${idx}].type`)"
            @blur="touchField(`args[${idx}].type`)"
          />
          <div class="abi-encode-form__value-wrp">
            <input-field
              v-if="arg.type === ETHEREUM_TYPES.tuple"
              :model-value="arg.subtype"
              is-clearable
              :label="$t('abi-encode-form.arg-subtype-label')"
              :placeholder="
                $t('abi-encode-form.arg-subtype-placeholder--tuple')
              "
              :error-message="getFieldErrorMessage(`args[${idx}].subtype`)"
              @blur="touchField(`args[${idx}].subtype`)"
              @clear="removeArg(arg.id)"
              @update:model-value="onArgSubtypeUpdate($event as string, idx)"
            />
            <textarea-field
              v-model="arg.value"
              size="small"
              :label="
                arg.type !== ETHEREUM_TYPES.tuple
                  ? $t('abi-encode-form.arg-subtype-label')
                  : ''
              "
              :placeholder="$t('abi-encode-form.arg-value-placeholder')"
              :error-message="getFieldErrorMessage(`args[${idx}].value`)"
              @blur="touchField(`args[${idx}].value`)"
            >
              <template v-if="arg.type !== ETHEREUM_TYPES.tuple" #nodeRight>
                <button
                  class="abi-encode-form__field-btn"
                  :class="{ 'abi-encode-form__field-btn--filled': arg.value }"
                  :disabled="!arg.type"
                  @click="arg.value = getDefaultValueOfType(arg.type)"
                >
                  <app-icon
                    :class="[
                      'abi-encode-form__field-btn-icon',
                      'abi-encode-form__field-btn-icon--refresh',
                    ]"
                    :name="$icons.refresh"
                  />
                </button>
                <button
                  class="abi-encode-form__field-btn"
                  :class="{ 'abi-encode-form__field-btn--filled': arg.value }"
                  @click="removeArg(arg.id)"
                >
                  <app-icon
                    class="abi-encode-form__field-btn-icon"
                    :name="$icons.x"
                  />
                </button>
              </template>
            </textarea-field>
          </div>
        </div>
      </div>
      <app-button
        scheme="none"
        :text="$t('abi-encode-form.add-arg-btn')"
        :icon-left="$icons.plus"
        @click="addArg"
      />
    </div>
    <div class="abi-encode-form__output">
      <input-field
        :model-value="funcSignature"
        :label="$t('abi-encode-form.func-signature-label')"
        :placeholder="$t('abi-encode-form.func-signature-placeholder')"
        readonly
      >
        <template #nodeRight>
          <app-copy :value="funcSignature" />
        </template>
      </input-field>
      <textarea-field
        :model-value="abiEncoding"
        :label="$t(`abi-encode-form.encoding-label--${form.encodeMode}`)"
        :placeholder="
          $t(`abi-encode-form.encoding-placeholder--${form.encodeMode}`)
        "
        readonly
      >
        <template #nodeRight>
          <app-copy :value="abiEncoding" />
        </template>
      </textarea-field>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppButton, AppCopy, AppIcon } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import {
  AutocompleteField,
  InputField,
  RadioButtonField,
  TextareaField,
} from '@/fields'
import {
  ErrorHandler,
  contractFuncName,
  createFunctionSignature,
  ethereumBaseType,
  ethereumBaseTypeValue,
  formatArgSubtype,
  getDefaultValueOfType,
  json,
  parseFuncArgToValueOfEncode,
  required,
  withinSizeOfEthereumType,
} from '@/helpers'
import { type AbiForm, type FieldOption } from '@/types'
import { Interface, ParamType, solidityPacked } from 'ethers'
import { without } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

enum ENCODE_MODES {
  standard = 'standard',
  packed = 'packed',
}

const { t } = i18n.global

const TYPE_OPTIONS: FieldOption[] = without(
  Object.values(ETHEREUM_TYPES),
  ETHEREUM_TYPES.uint,
  ETHEREUM_TYPES.uintArray,
).map(v => ({
  value: v,
  title: v,
}))

const ENCODE_MODE_OPTIONS = [
  {
    value: ENCODE_MODES.standard,
    title: t('abi-encode-form.encode-mode-option-title--standard'),
  },
  {
    value: ENCODE_MODES.packed,
    title: t('abi-encode-form.encode-mode-option-title--packed'),
  },
]

const abiEncoding = ref('')
const funcSignature = ref('')

const resetOutput = () => {
  abiEncoding.value = ''
  funcSignature.value = ''
}

const form = reactive({
  encodeMode: ENCODE_MODES.standard,
  funcName: '',
  args: [] as AbiForm.FuncArg[],
})
const rules = computed(() => ({
  funcName: {
    ...(form.encodeMode === ENCODE_MODES.standard && { contractFuncName }),
  },
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
          value: {
            ...(arg.type !== ETHEREUM_TYPES.string && { required }),
            ...(arg.type === ETHEREUM_TYPES.tuple && { json }),
            ethereumBaseTypeValue: ethereumBaseTypeValue(),
            withinSizeOfEthereumType: withinSizeOfEthereumType(),
          },
        },
      }),
      {},
    ),
  },
}))

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  rules,
)

const addArg = () =>
  form.args.push({ id: uuidv4(), type: '', subtype: '', value: '' })
const removeArg = (id: AbiForm.FuncArg['id']) => {
  form.args = form.args.filter(arg => arg.id !== id)
}

const onArgSubtypeUpdate = (
  newValue: AbiForm.FuncArg['subtype'],
  argIdx: number,
) => {
  form.args[argIdx].subtype = formatArgSubtype(newValue)
}

const encodeAbi = (types: string[], values: unknown[]): string => {
  if (form.encodeMode === ENCODE_MODES.packed) {
    return solidityPacked(types, values)
  }

  if (!form.funcName) {
    const iface = new Interface([`constructor(${types.join(', ')})`])
    return iface.encodeDeploy(values)
  }

  const iface = new Interface([
    `function ${form.funcName}(${types.join(', ')})`,
  ])

  return iface.encodeFunctionData(form.funcName, values)
}

const onFormChange = () => {
  if (!isFormValid()) {
    resetOutput()
    return
  }

  try {
    const types = form.args.map(arg =>
      arg.type === ETHEREUM_TYPES.tuple ? arg.subtype : arg.type,
    )
    const values = form.args.map(parseFuncArgToValueOfEncode)

    funcSignature.value = createFunctionSignature(
      types.map(type => ParamType.from(type)),
      form.encodeMode === ENCODE_MODES.standard
        ? form.funcName || 'constructor'
        : '',
    )

    abiEncoding.value = encodeAbi(types, values)
  } catch (error) {
    resetOutput()
    ErrorHandler.process(error)
  }
}

watch(form, onFormChange)

funcSignature.value = createFunctionSignature([], 'constructor')
abiEncoding.value = encodeAbi([], [])
</script>

<style lang="scss" scoped>
.abi-encode-form {
  display: grid;
  grid-gap: toRem(32);

  @include respond-to(medium) {
    grid-gap: toRem(24);
  }
}

.abi-encode-form__output,
.abi-encode-form__input {
  @include solidity-tools-form-part;
}

.abi-encode-form__title-wrp {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: inherit;
  flex-wrap: wrap;
}

.abi-encode-form .abi-encode-form__radio-button-field {
  @include respond-to(small) {
    width: 100%;
  }
}

.abi-encode-form__args_wrp {
  display: grid;
  grid-gap: inherit;
}

.abi-encode-form__arg {
  display: grid;
  grid-template-columns: minmax(toRem(150), 20%) 1fr;
  grid-gap: toRem(16);

  @include respond-to(small) {
    grid-template-columns: auto;
    grid-gap: toRem(8);
  }
}

.abi-encode-form__value-wrp {
  display: grid;
  grid-gap: toRem(16);
}

.abi-encode-form__field-btn {
  color: var(--field-placeholder);
  transition: color var(--field-transition-duration) ease;

  &--filled {
    color: var(--field-text);
  }

  &:disabled {
    color: var(--disable-primary-main);
  }

  &:not([disabled]):hover {
    color: var(--primary-light);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    color: var(--primary-main);
  }
}

.abi-encode-form .abi-encode-form__field-btn-icon {
  height: toRem(24);
  width: toRem(24);

  &--refresh {
    height: toRem(18);
    width: toRem(18);
  }
}
</style>
