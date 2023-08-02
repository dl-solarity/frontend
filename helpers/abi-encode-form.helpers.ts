import { ETHEREUM_TYPES } from '@/enums'
import { type AbiEncodeForm } from '@/types'
import { ValidationRule } from '@vuelidate/core'
import {
  checkIsAddress,
  checkIsBooleanArrayJsonString,
  checkIsBooleanString,
  checkIsBytesLike,
  checkIsBytesLikeArrayJsonString,
  checkIsEthereumType,
  checkIsString,
  checkIsUintLike,
  checkIsUnitLikeArrayJsonString,
} from '~/helpers/type.helpers'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

export function createFuncArgTypeRule(): ValidationRule {
  let _arg: AbiEncodeForm.FuncArg

  return {
    $validator: (_, arg: AbiEncodeForm.FuncArg) => {
      _arg = arg
      return checkIsEthereumType(arg.type)
    },
    $message: () =>
      JSON.stringify({
        id: _arg.id,
        field: 'type',
        message: t('validations.field-error_abiEncodeForm_funcArgType'),
      } as AbiEncodeForm.FuncArgErrorMsgInfo),
  }
}

export function createFuncArgValueRule(): ValidationRule {
  let _arg: AbiEncodeForm.FuncArg

  return {
    $validator: (_, arg: AbiEncodeForm.FuncArg) => {
      _arg = arg

      const baseType = arg.type.replace(/\d+/, '')
      const matchArray = arg.type.match(/\d+/)
      const sizeOfType = matchArray?.length ? Number(matchArray[0]) : 0

      switch (baseType) {
        case ETHEREUM_TYPES.address:
          return checkIsAddress(arg.value)
        case ETHEREUM_TYPES.bool:
          return checkIsBooleanString(arg.value)
        case ETHEREUM_TYPES.boolArray:
          return checkIsBooleanArrayJsonString(arg.value)
        case ETHEREUM_TYPES.bytes:
          return checkIsBytesLike(arg.value, sizeOfType)
        case ETHEREUM_TYPES.bytesArray:
          return checkIsBytesLikeArrayJsonString(arg.value, sizeOfType)
        case ETHEREUM_TYPES.string:
          return checkIsString(arg.value)
        case ETHEREUM_TYPES.uint:
          return checkIsUintLike(arg.value, sizeOfType)
        case ETHEREUM_TYPES.uintArray:
          return checkIsUnitLikeArrayJsonString(arg.value, sizeOfType)
        default:
          return false
      }
    },
    $message: () => {
      const baseType = _arg.type.replace(/\d+/, '')

      let message
      switch (true) {
        // if you need custom message then set case of ethereum type here
        case _arg.type === ETHEREUM_TYPES.address:
        case _arg.type === ETHEREUM_TYPES.bool:
        case _arg.type === ETHEREUM_TYPES.boolArray:
          message = t(
            `validations.field-error_abiEncodeForm_funcArgValue--${_arg.type.replace(
              '[]',
              'Array',
            )}`,
          )
          break
        case baseType === ETHEREUM_TYPES.bytes:
        case baseType === ETHEREUM_TYPES.bytesArray:
        case baseType === ETHEREUM_TYPES.uint:
        case baseType === ETHEREUM_TYPES.uintArray:
          message = t(
            `validations.field-error_abiEncodeForm_funcArgValue--${baseType.replace(
              '[]',
              'Array',
            )}`,
            { type: _arg.type.replace('[]', '') },
          )
          break
        default:
          message = ''
      }

      return JSON.stringify({
        id: _arg.id,
        field: 'value',
        message,
      } as AbiEncodeForm.FuncArgErrorMsgInfo)
    },
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
