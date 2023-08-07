<template>
  <form class="abi-encode-form" @submit.prevent>
    <div class="abi-encode-form__input">
      <h2>{{ title }}</h2>
      <input-field
        v-model="form.funcName"
        :label="$t('abi-encode-form.func-name-label')"
        :placeholder="$t('abi-encode-form.func-name-placeholder')"
        :error-message="getFieldErrorMessage('funcName')"
        @blur="touchField('funcName')"
      />
      <div v-if="form.args.length" class="abi-encode-form__args_wrp">
        <div
          v-for="(arg, idx) in form.args"
          :key="arg.id"
          class="abi-encode-form__arg"
        >
          <select-field
            v-model="arg.type"
            :label="$t('abi-encode-form.arg-type-label')"
            :placeholder="$t('abi-encode-form.arg-type-placeholder')"
            :value-options="
              Object.values(ETHEREUM_TYPES).map(v => ({ value: v, title: v }))
            "
            :error-message="getFieldErrorMessage(`args[${idx}].type`)"
            @blur="touchField(`args[${idx}].type`)"
          />
          <input-field
            v-model="arg.value"
            is-clearable
            :label="$t('abi-encode-form.arg-value-label')"
            :placeholder="$t('abi-encode-form.arg-value-placeholder')"
            :error-message="getFieldErrorMessage(`args[${idx}].value`)"
            @blur="touchField(`args[${idx}].value`)"
            @clear="removeArg(arg.id)"
          />
        </div>
      </div>
      <app-button
        class="abi-encode-form__add-arg-btn"
        scheme="none"
        :text="$t('abi-encode-form.add-arg-btn')"
        :icon-left="$icons.plus"
        @click="addArg"
      />
    </div>
    <div class="abi-encode-form__output">
      <h2>{{ $t('abi-encode-form.output-title') }}</h2>
      <input-field
        :model-value="funcSignature"
        :label="$t('abi-encode-form.func-signature-label')"
        :placeholder="$t('abi-encode-form.func-signature-placeholder')"
        readonly
      />
      <textarea-field
        :model-value="abiEncoding"
        :label="$t('abi-encode-form.abi-encoding-label')"
        :placeholder="$t('abi-encode-form.abi-encoding-placeholder')"
        readonly
      />
      <app-button
        :text="$t('abi-encode-form.abi-encoding-copy-btn')"
        @click="copyToClipboard(abiEncoding)"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppButton } from '#components'
import { useFormValidation } from '@/composables'
import { ETHEREUM_TYPES } from '@/enums'
import { InputField, SelectField, TextareaField } from '@/fields'
import {
  ErrorHandler,
  contractFuncName,
  copyToClipboard,
  ethereumBaseTypeValue,
  parseFuncArgToValueOfEncode,
  required,
  requiredIf,
  withinSizeOfEthereumType,
} from '@/helpers'
import { type AbiEncodeForm } from '@/types'
import { Interface } from 'ethers'
import { v4 as uuidv4 } from 'uuid'
import { computed, reactive, ref, watch } from 'vue'

defineProps<{
  title: string
}>()

const abiEncoding = ref('')
const funcSignature = ref('')

const resetOutput = () => {
  abiEncoding.value = ''
  funcSignature.value = ''
}

const form = reactive({
  funcName: '',
  args: [] as AbiEncodeForm.FuncArg[],
})
const rules = computed(() => ({
  funcName: { contractFuncName },
  args: {
    ...form.args.reduce(
      (acc, arg, idx) => ({
        ...acc,
        [idx]: {
          type: { required },
          value: {
            required: requiredIf(arg.type !== ETHEREUM_TYPES.string),
            ethereumBaseTypeValue: ethereumBaseTypeValue(),
            withinSizeOfEthereumType: withinSizeOfEthereumType(),
          },
        },
      }),
      {},
    ),
  },
}))

const { getFieldErrorMessage, isFieldsValid, touchField } = useFormValidation(
  form,
  rules,
)

const addArg = () => form.args.push({ id: uuidv4(), type: '', value: '' })
const removeArg = (id: AbiEncodeForm.FuncArg['id']) => {
  form.args = form.args.filter(arg => arg.id !== id)
}

const encode = () => {
  const types = form.args.map(arg => arg.type)
  const values = form.args.map(parseFuncArgToValueOfEncode)

  if (!form.funcName) {
    funcSignature.value = `constructor(${types.join(', ')})`
    const iface = new Interface([funcSignature.value])
    abiEncoding.value = iface.encodeDeploy(values)
    return
  }

  funcSignature.value = `${form.funcName}(${types.join(', ')})`
  const iface = new Interface([`function ${funcSignature.value}`])
  abiEncoding.value = iface.encodeFunctionData(form.funcName, values)
}

const onFormChange = () => {
  if (!isFieldsValid.value) {
    resetOutput()
    return
  }

  try {
    encode()
  } catch (error) {
    resetOutput()
    ErrorHandler.process(error)
  }
}

watch(form, onFormChange)
onFormChange()
</script>

<style lang="scss" scoped>
.abi-encode-form {
  display: grid;
  gap: toRem(40);
}

.abi-encode-form__output,
.abi-encode-form__input {
  display: grid;
  gap: toRem(20);
}

.abi-encode-form__input {
  padding-bottom: toRem(40);
  border-bottom: toRem(1) solid var(--text-secondary-main);
}

.abi-encode-form__args_wrp {
  display: grid;
  grid-gap: toRem(16);

  @include respond-to(small) {
    grid-gap: toRem(48);
  }
}

.abi-encode-form__arg {
  display: grid;
  grid-gap: toRem(16);
  grid-template-columns: minmax(toRem(140), 20%) 1fr;

  @include respond-to(small) {
    grid-template-columns: auto;
  }
}

.abi-encode-form__add-arg-btn {
  padding: toRem(12) toRem(16);
}
</style>
