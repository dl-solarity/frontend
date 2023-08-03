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
      v-if="form.args.length || errorMessage"
      class="abi-decode-form__output"
    >
      <p v-if="errorMessage" class="abi-decode-form__error-msg">
        {{ $t('abi-decode-form.error-msg', { msg: errorMessage }) }}
      </p>
      <template v-if="form.args.length">
        <h2>{{ $t('abi-decode-form.output-title') }}</h2>
        <div class="abi-decode-form__args_wrp">
          <div
            v-for="arg in form.args"
            :key="arg.id"
            class="abi-decode-form__arg"
          >
            <select-field
              v-model="arg.type"
              :readonly="form.decodeMode === DECODE_MODES.auto"
              :label="$t('abi-decode-form.arg-type-label')"
              :placeholder="$t('abi-decode-form.arg-type-placeholder')"
              :value-options="
                Object.values(ETHEREUM_TYPES).map(v => ({ value: v, title: v }))
              "
              :error-message="getFuncArgErrorMsg(arg.id, 'type')"
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
import { AppButton } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import {
  CheckboxField,
  InputField,
  RadioButtonField,
  SelectField,
  TextareaField,
} from '@/fields'
import {
  ErrorHandler,
  createFuncArgTypeRule,
  forEach,
  hex,
  required,
} from '@/helpers'
import { type AbiEncodeForm, type FieldOption } from '@/types'
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

const errorMessage = ref('')

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
    $each: forEach({
      type: { funcArgTypeRule: createFuncArgTypeRule() },
    }),
  },
}))

const { getFieldErrorMessage, isFieldsValid, touchField } = useFormValidation(
  form,
  rules,
)

const funcArgErrorMsgLists = computed<string[][]>(
  () => getFieldErrorMessage('args') as unknown as string[][],
)

const getFuncArgErrorMsg = (
  id: AbiEncodeForm.FuncArgErrorMsgInfo['id'],
  field: AbiEncodeForm.FuncArgErrorMsgInfo['field'],
): AbiEncodeForm.FuncArgErrorMsgInfo['message'] => {
  let funcArgErrorMsgInfo: AbiEncodeForm.FuncArgErrorMsgInfo | null = null

  for (const list of funcArgErrorMsgLists.value) {
    const msg = list.find(msg => {
      try {
        const msgInfo = JSON.parse(msg) as AbiEncodeForm.FuncArgErrorMsgInfo
        return msgInfo.id === id && msgInfo.field === field
      } catch {
        return false
      }
    })

    if (msg) {
      funcArgErrorMsgInfo = JSON.parse(msg)
      break
    }
  }

  return funcArgErrorMsgInfo?.message || ''
}

const decode = () => {
  if (form.decodeMode === DECODE_MODES.auto) {
    const paramTypes = guessAbiEncodedData(form.abiEncoding)
    if (!paramTypes) throw new Error('failed guess params types')

    const types = paramTypes.map(type => type.format())
    const values = AbiCoder.defaultAbiCoder().decode(types, form.abiEncoding)

    form.args = types.map((type, idx) => ({
      id: uuidv4(),
      type: type,
      value: String(values[idx]),
    }))
  }

  if (form.decodeMode === DECODE_MODES.manual) {
    const types = form.args.map(arg => arg.type)
    const values = AbiCoder.defaultAbiCoder().decode(types, form.abiEncoding)

    values.forEach((value, idx) => {
      form.args[idx].value = String(value)
    })
  }
}

const onFormChange = () => {
  if (!isFieldsValid.value) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    errorMessage.value = ''
    return
  }

  try {
    decode()
    errorMessage.value = ''
  } catch (error) {
    if (form.decodeMode === DECODE_MODES.auto) form.args.length = 0
    errorMessage.value =
      error instanceof Error
        ? error.message
        : t('abi-decode-form.error-msg--unknown')
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
  word-break: break-all;
}

.abi-decode-form__add-arg-btn {
  padding: toRem(12) toRem(16);
}
</style>
