import { ETHEREUM_TYPES } from '@/enums'
import { type AbiEncodeForm } from '@/types'
import { ValidationRule } from '@vuelidate/core'
import { type BytesLike } from '@/types'
import { type BigNumber } from 'bignumber.js'
import {
  checkBytesAmount,
  checkIsAddress,
  checkIsBooleanArrayJsonString,
  checkIsBooleanString,
  checkIsBytesLike,
  checkIsBytesLikeArrayJsonString,
  checkIsEthereumType,
  checkIsString,
  checkIsUintLike,
  checkIsUnitLikeArrayJsonString,
  checkUintIsWithinRange,
} from '~/helpers/type.helpers'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

export function ethereumBaseTypeValue(): ValidationRule {
  let _arg: AbiEncodeForm.FuncArg
  let _baseType: string

  return {
    $validator: (_, arg: AbiEncodeForm.FuncArg) => {
      _arg = arg
      _baseType = arg.type.replace(/\d+/, '')

      switch (_baseType) {
        case ETHEREUM_TYPES.address:
          return checkIsAddress(arg.value)
        case ETHEREUM_TYPES.bool:
          return checkIsBooleanString(arg.value)
        case ETHEREUM_TYPES.boolArray:
          return checkIsBooleanArrayJsonString(arg.value)
        case ETHEREUM_TYPES.bytes:
          return checkIsBytesLike(arg.value)
        case ETHEREUM_TYPES.bytesArray:
          return checkIsBytesLikeArrayJsonString(arg.value)
        case ETHEREUM_TYPES.string:
          return checkIsString(arg.value)
        case ETHEREUM_TYPES.uint:
          return checkIsUintLike(arg.value)
        case ETHEREUM_TYPES.uintArray:
          return checkIsUnitLikeArrayJsonString(arg.value)
        default:
          return false
      }
    },

    $message: () => {
      switch (true) {
        // if you need custom message then set case of ethereum type here
        case _arg.type === ETHEREUM_TYPES.address:
        case _arg.type === ETHEREUM_TYPES.bool:
        case _arg.type === ETHEREUM_TYPES.boolArray:
          return t(
            `validations.field-error_ethereumBaseTypeValue--${_arg.type.replace(
              '[]',
              'Array',
            )}`,
          )
        case _baseType === ETHEREUM_TYPES.bytes:
        case _baseType === ETHEREUM_TYPES.bytesArray:
        case _baseType === ETHEREUM_TYPES.uint:
        case _baseType === ETHEREUM_TYPES.uintArray:
          return t(
            `validations.field-error_ethereumBaseTypeValue--${_baseType.replace(
              '[]',
              'Array',
            )}`,
            { type: _baseType.replace('[]', '') },
          )
        default:
          return ''
      }
    },
  }
}

export function withinSizeOfEthereumType(): ValidationRule {
  let _baseType: string

  return {
    $validator: (_, arg: AbiEncodeForm.FuncArg) => {
      _baseType = arg.type.replace(/\d+/, '')

      if (_baseType === arg.type) return true

      const isArray = arg.type.includes('[]')
      const matchArray = arg.type.match(/\d+/)
      const sizeOfType = matchArray?.length ? Number(matchArray[0]) : 0

      if (isArray) {
        try {
          return JSON.parse(arg.value).every((v: unknown) => {
            switch (_baseType) {
              case ETHEREUM_TYPES.bytesArray:
                return checkBytesAmount(v as BytesLike, sizeOfType)
              case ETHEREUM_TYPES.uintArray:
                return checkUintIsWithinRange(v as BigNumber.Value, sizeOfType)
              default:
                return true
            }
          })
        } catch {
          return false
        }
      }

      switch (_baseType) {
        case ETHEREUM_TYPES.bytes:
          return checkBytesAmount(arg.value, sizeOfType)
        case ETHEREUM_TYPES.uint:
          return checkUintIsWithinRange(arg.value, sizeOfType)
        default:
          return true
      }
    },

    $message: () =>
      t(
        `validations.field-error_withinSizeOfEthereumType--${_baseType.replace(
          '[]',
          'Array',
        )}`,
      ),
  }
}

export const parseFuncArgToValueOfEncode = (
  arg: AbiEncodeForm.FuncArg,
): unknown => {
  if (!checkIsEthereumType(arg.type)) throw new Error('unknown ethereum type')

  const isArrayType = arg.type.includes('[]')

  switch (true) {
    case isArrayType:
      return JSON.parse(arg.value as string)
    case arg.type === ETHEREUM_TYPES.bool:
      return arg.value === 'true'
    default:
      return arg.value
  }
}
