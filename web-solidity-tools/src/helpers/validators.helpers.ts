import {
  helpers,
  required as _required,
  email as _email,
  minLength as _minLength,
  maxLength as _maxLength,
  sameAs as _sameAs,
  integer as _integer,
  minValue as _minValue,
} from '@vuelidate/validators'
import { ValidationRule } from '@vuelidate/core'
import { Ref } from 'vue'
import { createI18nMessage, MessageProps } from '@vuelidate/validators'
import get from 'lodash/get'
import { i18n } from '@/localization'
import { isAddress, isBytesLike } from 'ethers'

const HASH_REGEX = /^0x[a-fA-F0-9]{64}$/

const { t } = i18n.global || i18n

const messagePath = ({ $validator }: MessageProps) =>
  `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const required = <ValidationRule>withI18nMessage(_required)

export const email = <ValidationRule>withI18nMessage(_email)

export const address = <ValidationRule>(
  withI18nMessage(value => isAddress(value))
)

export const hash = <ValidationRule>withI18nMessage(helpers.regex(HASH_REGEX))

export const bytes = <ValidationRule>(
  withI18nMessage(value => isBytesLike(value))
)
export const integer = <ValidationRule>withI18nMessage(_integer)

export const minValue = (value: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minValue(value))

export const minLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minLength(length))

export const maxLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_maxLength(length))

export const sameAs = (field: Ref): ValidationRule => {
  return <ValidationRule>withI18nMessage(_sameAs(field, get(field, '_key')))
}
