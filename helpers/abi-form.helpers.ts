import { ETHEREUM_TYPES } from '@/enums'
import {
  checkBytesAmount,
  checkIsAddress,
  checkIsAddressArrayJsonString,
  checkIsBooleanArrayJsonString,
  checkIsBooleanString,
  checkIsBytesLike,
  checkIsBytesLikeArrayJsonString,
  checkIsEthereumType,
  checkIsString,
  checkIsStringArrayJsonString,
  checkIsUintLike,
  checkIsUnitLikeArrayJsonString,
  checkUintIsWithinRange,
} from '@/helpers'
import { type AbiForm, type BytesLike } from '@/types'
import { ValidationRule } from '@vuelidate/core'
import { type BigNumber } from 'bignumber.js'
import { AbiCoder, ParamType } from 'ethers'
import { i18n } from '~/plugins/localization'

const abiCoder = AbiCoder.defaultAbiCoder()
const { t } = i18n.global

export const ethereumBaseType = (baseType: string): ValidationRule => {
  return {
    $validator: value => {
      try {
        const paramType = ParamType.from(value)
        return paramType.baseType === baseType
      } catch {
        return false
      }
    },
    $message: () => t('validations.field-error_ethereumBaseType', { baseType }),
  }
}

export function ethereumBaseTypeValue(): ValidationRule {
  let _arg: AbiForm.FuncArg
  let _baseType: string

  return {
    $validator: (_, arg: AbiForm.FuncArg) => {
      _arg = arg
      _baseType = arg.type.replace(/\d+/, '')

      switch (_baseType) {
        case ETHEREUM_TYPES.address:
          return checkIsAddress(arg.value)
        case ETHEREUM_TYPES.addressArray:
          return checkIsAddressArrayJsonString(arg.value)
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
        case ETHEREUM_TYPES.stringArray:
          return checkIsStringArrayJsonString(arg.value)
        case ETHEREUM_TYPES.tuple:
          try {
            return Boolean(
              abiCoder.encode(
                [arg.subtype],
                [parseFuncArgToValueOfEncode(arg)],
              ),
            )
          } catch {
            return false
          }
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
        case _arg.type === ETHEREUM_TYPES.addressArray:
        case _arg.type === ETHEREUM_TYPES.bool:
        case _arg.type === ETHEREUM_TYPES.boolArray:
        case _arg.type === ETHEREUM_TYPES.stringArray:
        case _arg.type === ETHEREUM_TYPES.tuple:
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
    $validator: (_, arg: AbiForm.FuncArg) => {
      _baseType = arg.type.replace(/\d+/, '')

      const isUintBaseType = [
        ETHEREUM_TYPES.uint,
        ETHEREUM_TYPES.uintArray,
      ].includes(_baseType as ETHEREUM_TYPES)

      if (_baseType === arg.type && !isUintBaseType) return true

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
                return checkUintIsWithinRange(
                  v as BigNumber.Value,
                  sizeOfType || 256,
                )
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
          return checkUintIsWithinRange(arg.value, sizeOfType || 256)
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

export const parseFuncArgToValueOfEncode = (arg: AbiForm.FuncArg): unknown => {
  if (!checkIsEthereumType(arg.type)) throw new Error('unknown ethereum type')

  const isArrayType = arg.type.includes('[]')

  switch (true) {
    case isArrayType:
    case arg.type === ETHEREUM_TYPES.tuple:
      return JSON.parse(arg.value as string)
    case arg.type === ETHEREUM_TYPES.bool:
      return arg.value === 'true'
    default:
      return arg.value
  }
}

export const formatArgSubtype = (subtype: AbiForm.FuncArg['subtype']) => {
  return subtype.replaceAll('tuple(', '(').replaceAll('(', 'tuple(')
}

export const getDefaultValueOfType = (
  type: AbiForm.FuncArg['type'],
): string => {
  const baseType = type.replace(/\d+/, '')
  const matchArray = type.match(/\d+/)
  const sizeOfType = matchArray?.length ? Number(matchArray[0]) : 0

  switch (baseType) {
    case ETHEREUM_TYPES.address:
      return '0x0000000000000000000000000000000000000000'
    case ETHEREUM_TYPES.addressArray:
      return '["0x0000000000000000000000000000000000000000"]'
    case ETHEREUM_TYPES.bool:
      return 'false'
    case ETHEREUM_TYPES.boolArray:
      return '[false]'
    case ETHEREUM_TYPES.bytes:
      return sizeOfType ? '0x'.concat('00'.repeat(sizeOfType)) : '0x00'
    case ETHEREUM_TYPES.bytesArray:
      return sizeOfType ? `["0x${'00'.repeat(sizeOfType)}"]` : '["0x00"]'
    case ETHEREUM_TYPES.stringArray:
      return '[""]'
    case ETHEREUM_TYPES.uint:
      return sizeOfType.toString()
    case ETHEREUM_TYPES.uintArray:
      return `["${sizeOfType}"]`
    default:
      return ''
  }
}
