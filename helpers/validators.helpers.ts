import {
  helpers,
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
import { Ref } from 'vue'
import { createI18nMessage, MessageProps } from '@vuelidate/validators'
import { get } from 'lodash-es'
import { i18n } from '@/plugins/localization'

import { isAddress, isBytesLike } from 'ethers'

const HASH_REGEX = /^0x[a-fA-F0-9]{64}$/
const HEX_REGEX = /^0x[a-fA-F0-9]*$/
const HEXADECIMAL_REGEX = /(^[a-fA-F0-9]*$)|(^-[a-fA-F0-9]+$)/
const BINARY_REGEX = /(^[0-1]*$)|(^-[0-1]+$)/
const OCTAL_REGEX = /(^[0-7]*$)|(^-[0-7]+$)/

const { t } = i18n.global

const messagePath = ({ $validator }: MessageProps) =>
  `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const forEach = helpers.forEach

export const required = <ValidationRule>withI18nMessage(_required)

export const email = <ValidationRule>withI18nMessage(_email)

export const address = <ValidationRule>(
  withI18nMessage(value => isAddress(value))
)

export const hash = <ValidationRule>withI18nMessage(helpers.regex(HASH_REGEX))
export const hex = <ValidationRule>withI18nMessage(helpers.regex(HEX_REGEX))

export const hexadecimal = <ValidationRule>(
  withI18nMessage(helpers.regex(HEXADECIMAL_REGEX))
)

export const binary = <ValidationRule>(
  withI18nMessage(helpers.regex(BINARY_REGEX))
)

export const octal = <ValidationRule>withI18nMessage(helpers.regex(OCTAL_REGEX))

export const bytes = <ValidationRule>(
  withI18nMessage(value => isBytesLike(value))
)
export const integer = <ValidationRule>withI18nMessage(_integer)

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
