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
          <div class="abi-encode-form__side-wrp">
            <app-button
              class="abi-encode-form__arg-add-btn"
              scheme="none"
              modification="none"
              color="none"
              :icon-left="$icons.plus"
              @click="addArg(idx)"
            />
            <autocomplete-field
              v-model="arg.type"
              class="abi-encode-form__autocomplete-field"
              :label="$t('abi-encode-form.arg-type-label')"
              :placeholder="$t('abi-encode-form.arg-type-placeholder')"
              :options="TYPE_OPTIONS"
              :error-message="getFieldErrorMessage(`args[${idx}].type`)"
              @blur="touchField(`args[${idx}].type`)"
            />
          </div>
          <div class="abi-encode-form__value-wrp">
            <input-field
              v-if="LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type)"
              :model-value="arg.subtype"
              :label="$t('abi-encode-form.arg-subtype-label')"
              :placeholder="
                $t(
                  `abi-encode-form.arg-subtype-placeholder--${
                    arg.type === ETHEREUM_TYPES.tupleArray
                      ? 'tupleArray'
                      : 'tuple'
                  }`,
                )
              "
              :error-message="getFieldErrorMessage(`args[${idx}].subtype`)"
              @blur="touchField(`args[${idx}].subtype`)"
              @clear="removeArg(arg.id)"
              @update:model-value="onArgSubtypeUpdate($event as string, idx)"
            >
              <template #nodeRight>
                <button
                  class="abi-encode-form__field-btn"
                  :class="{
                    'abi-encode-form__field-btn--filled': arg.subtype,
                  }"
                  @click="arg.subtype = getDefaultSubtypeOfType(arg.type)"
                >
                  <app-icon
                    class="abi-encode-form__field-btn-icon"
                    :name="$icons.keyboard"
                  />
                </button>
                <button
                  class="abi-encode-form__field-btn"
                  :class="{
                    'abi-encode-form__field-btn--filled': arg.subtype,
                  }"
                  @click="removeArg(arg.id)"
                >
                  <app-icon
                    :class="[
                      'abi-encode-form__field-btn-icon',
                      'abi-encode-form__field-btn-icon--x-mark',
                    ]"
                    :name="$icons.x"
                  />
                </button>
              </template>
            </input-field>
            <textarea-field
              v-model="arg.value"
              size="small"
              :label="
                !LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type)
                  ? $t('abi-encode-form.arg-value-label')
                  : ''
              "
              :placeholder="$t('abi-encode-form.arg-value-placeholder')"
              :error-message="getFieldErrorMessage(`args[${idx}].value`)"
              @blur="touchField(`args[${idx}].value`)"
            >
              <template #nodeRight>
                <button
                  class="abi-encode-form__field-btn"
                  :class="{ 'abi-encode-form__field-btn--filled': arg.value }"
                  :disabled="!arg.type"
                  @click="arg.value = getDefaultValueOfType(arg.type)"
                >
                  <app-icon
                    class="abi-encode-form__field-btn-icon"
                    :name="$icons.keyboard"
                  />
                </button>
                <button
                  v-if="!LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type)"
                  class="abi-encode-form__field-btn"
                  :class="{ 'abi-encode-form__field-btn--filled': arg.value }"
                  @click="removeArg(arg.id)"
                >
                  <app-icon
                    :class="[
                      'abi-encode-form__field-btn-icon',
                      'abi-encode-form__field-btn-icon--x-mark',
                    ]"
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
        @click="addArg(form.args.length)"
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
    <div class="abi-encode-form__share-btn-wrp">
      <app-button
        modification="text"
        :text="
          !isUrlCopied
            ? $t('abi-encode-form.share-btn')
            : $t('abi-encode-form.share-btn--copied')
        "
        :icon-right="isUrlCopied ? $icons.checkDouble : ''"
        @click="onShareBtnClick"
      />
    </div>
    <div v-if="isInitializing" class="abi-encode-form__loader-wrp">
      <app-loader />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRouter } from '#app'
import { AppButton, AppCopy, AppIcon, AppLoader } from '#components'
import { useFormValidation } from '@/composables'
import { COPIED_DURING_MS } from '@/constants'
import { ETHEREUM_TYPES, ROUTE_NAMES } from '@/enums'
import {
  AutocompleteField,
  InputField,
  RadioButtonField,
  TextareaField,
} from '@/fields'
import {
  ErrorHandler,
  contractFuncName,
  copyToClipboard,
  createFunctionSignature,
  ethereumBaseType,
  ethereumBaseTypeValue,
  ethereumTupleArrayType,
  formatArgSubtype,
  getDefaultSubtypeOfType,
  getDefaultValueOfType,
  json,
  parseFuncArgToValueOfEncode,
  required,
  sleep,
  withinSizeOfEthereumType,
} from '@/helpers'
import { linkShortener } from '@/services'
import { type AbiForm, type FieldOption } from '@/types'
import { Interface, ParamType, solidityPacked } from 'ethers'
import { without } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, reactive, ref, watch } from 'vue'
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

const LIST_OF_TYPES_WITH_SUBTYPE: Array<AbiForm.FuncArg['type']> = [
  ETHEREUM_TYPES.tuple,
  ETHEREUM_TYPES.tupleArray,
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
            ...(LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type) && { required }),
            ...(arg.type === ETHEREUM_TYPES.tuple && {
              ethereumBaseType: ethereumBaseType('tuple'),
            }),
            ...(arg.type === ETHEREUM_TYPES.tupleArray && {
              ethereumTupleArrayType,
            }),
          },
          value: {
            ...(arg.type !== ETHEREUM_TYPES.string && { required }),
            ...(LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type) && { json }),
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

const addArg = (idxTo: number) => {
  form.args.splice(idxTo, 0, { id: uuidv4(), type: '', subtype: '', value: '' })
}

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
      LIST_OF_TYPES_WITH_SUBTYPE.includes(arg.type) ? arg.subtype : arg.type,
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

const router = useRouter()
const isUrlCopied = ref(false)

const onShareBtnClick = async (): Promise<void> => {
  const { path: routePathOfEncoder } = router.resolve({
    name: ROUTE_NAMES.abiEncoderId,
  })

  try {
    const { id } = await linkShortener.createLink(
      {
        encodeMode: form.encodeMode,
        funcName: form.funcName,
        args: form.args,
      },
      routePathOfEncoder,
    )

    history.replaceState(null, '', `${routePathOfEncoder}/${id}`)

    await copyToClipboard(window.location.href)
    isUrlCopied.value = true
    await sleep(COPIED_DURING_MS)
    isUrlCopied.value = false
  } catch (error) {
    ErrorHandler.process(error)
  }
}

watch(form, onFormChange)

funcSignature.value = createFunctionSignature([], 'constructor')
abiEncoding.value = encodeAbi([], [])

const isInitializing = ref(Boolean(router.currentRoute.value.params.id))
const init = async (): Promise<void> => {
  isInitializing.value = true

  try {
    const { id } = router.currentRoute.value.params
    if (id && typeof id === 'string') {
      const { attributes } = await linkShortener.getDataByLink(id)

      Object.assign(form, {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        encodeMode: attributes.value?.encodeMode,
        // @ts-ignore
        funcName: attributes.value?.funcName,
        // @ts-ignore
        args: attributes.value?.args,
        /* eslint-enable @typescript-eslint/ban-ts-comment */
      })
    }
  } catch (error) {
    ErrorHandler.process(error)
    await router.replace({ name: ROUTE_NAMES.abiEncoderId })
  } finally {
    isInitializing.value = false
  }
}

onMounted(() => {
  init()
})
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
  grid-template-columns: minmax(toRem(220), 20%) 1fr;
  grid-gap: toRem(16);

  @include respond-to(small) {
    grid-template-columns: auto;
    grid-gap: toRem(8);
  }
}

.abi-encode-form__side-wrp {
  display: flex;
  gap: toRem(16);
  width: 100%;

  @include respond-to(small) {
    gap: toRem(8);
  }
}

.abi-encode-form .abi-encode-form__arg-add-btn {
  margin-top: calc(
    var(--field-label-line-height) + var(--field-label-margin-bottom)
  );
  height: toRem(48);
  width: toRem(48);
  background: var(--field-bg-primary);
  border: toRem(1) solid var(--field-border);
  border-radius: var(--field-border-radius);
  color: var(--primary-main);

  &:not([disabled]):hover {
    background: var(--field-bg-primary);
    border: toRem(1) solid var(--field-border-hover);
    color: var(--primary-main);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    background: var(--field-bg-primary);
    border: toRem(1) solid var(--field-border-focus);
    color: var(--primary-main);
  }
}

.abi-encode-form .abi-encode-form__autocomplete-field {
  flex: 1;
}

.abi-encode-form__value-wrp {
  display: grid;
  grid-gap: toRem(16);
}

.abi-encode-form__field-btn {
  color: var(--field-placeholder);
  transition: color var(--transition-duration-fast)
    var(--transition-timing-default);

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
  margin-right: toRem(-1);

  &--x-mark {
    margin-right: toRem(-5);
  }
}

.abi-encode-form__share-btn-wrp {
  @include solidity-tools-form-share-btn-wrp;
}

.abi-encode-form__loader-wrp {
  @include solidity-tools-page-content-loader-wrp;
}
</style>
