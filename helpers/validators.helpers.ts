import {
  helpers,
  numeric as _numeric,
  required as _required,
  email as _email,
  minLength as _minLength,
  maxLength as _maxLength,
  sameAs as _sameAs,
  integer as _integer,
  minValue as _minValue,
  maxValue as _maxValue,
} from '@vuelidate/validators'
import { ValidationRule } from '@vuelidate/core'
import { createI18nMessage, MessageProps } from '@vuelidate/validators'
import { ConstructorFragment, FunctionFragment, getBigInt } from 'ethers'
import { get, isFinite } from 'lodash-es'
import { Ref } from 'vue'
import { i18n } from '~/plugins/localization'

import { isAddress, isBytesLike } from 'ethers'
import { MAX_BN128_SAFE_VALUE } from '@/constants/bn128.constants'

const HASH_REGEX = /^0x[a-fA-F0-9]{64}$/
const HEX_REGEX = /^0x[a-fA-F0-9]*$/
const HEXADECIMAL_REGEX = /^0x[a-fA-F0-9]+$/
const HEXADECIMAL_OR_EMPTY_REGEX = /^0x[a-fA-F0-9]*$/
const BINARY_REGEX = /^0b[01]+$/
const OCTAL_REGEX = /^0o?[0-7]+$/
const CONTRACT_FUNC_NAME_REGEXP = /^[a-zA-Z_][a-zA-Z0-9_]*$/

const { t } = i18n.global

const messagePath = ({ $validator }: MessageProps) =>
  `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const numeric = <ValidationRule>withI18nMessage(_numeric)

export const required = <ValidationRule>withI18nMessage(_required)

export const email = <ValidationRule>withI18nMessage(_email)

export const address = <ValidationRule>(
  withI18nMessage(value => isAddress(value) && value.startsWith('0x'))
)

export const hash = <ValidationRule>withI18nMessage(helpers.regex(HASH_REGEX))
export const hex = <ValidationRule>withI18nMessage(helpers.regex(HEX_REGEX))

export const hexadecimal = <ValidationRule>(
  withI18nMessage(helpers.regex(HEXADECIMAL_REGEX))
)

export const isNumericOrHexadecimal = <ValidationRule>withI18nMessage(value => {
  return HEXADECIMAL_REGEX.test(value) || isFinite(Number(value))
})

export const hexadecimalOrEmpty = <ValidationRule>(
  withI18nMessage(helpers.regex(HEXADECIMAL_OR_EMPTY_REGEX))
)

export const maxBn128Value = <ValidationRule>withI18nMessage(value => {
  if (HEXADECIMAL_REGEX.test(value)) {
    getBigInt(value) <= MAX_BN128_SAFE_VALUE
  }

  if (isFinite(Number(value))) {
    return BigInt(value) <= MAX_BN128_SAFE_VALUE
  }

  return false
})

export const binary = <ValidationRule>(
  withI18nMessage(helpers.regex(BINARY_REGEX))
)

export const octal = <ValidationRule>withI18nMessage(helpers.regex(OCTAL_REGEX))

export const contractFuncName = <ValidationRule>(
  withI18nMessage(helpers.regex(CONTRACT_FUNC_NAME_REGEXP))
)

export const bytes = <ValidationRule>(
  withI18nMessage(value => isBytesLike(value))
)
export const integer = <ValidationRule>withI18nMessage(_integer)

export const json = <ValidationRule>withI18nMessage(value => {
  try {
    return Boolean(JSON.parse(value))
  } catch {
    return false
  }
})

export const functionSignature = <ValidationRule>withI18nMessage(value => {
  try {
    const fragment = value?.startsWith('constructor')
      ? ConstructorFragment.from(value)
      : FunctionFragment.from(value)

    const types = fragment.inputs.map(paramType =>
      paramType.format().replaceAll('(', 'tuple('),
    )

    const name =
      fragment instanceof FunctionFragment ? fragment.name : 'constructor'

    return value === `${name}(${types.join(',')})`
  } catch {
    return false
  }
})

export const minValue = (value: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minValue(value))

export const maxValue = (value: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_maxValue(value))

export const minLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minLength(length))

export const maxLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_maxLength(length))

export const sameAs = (field: Ref): ValidationRule => {
  return <ValidationRule>withI18nMessage(_sameAs(field, get(field, '_key')))
}
