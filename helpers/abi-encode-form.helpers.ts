import { ETHEREUM_TYPES } from '@/enums'
import { type AbiEncodeForm } from '@/types'
import { ValidationRule } from '@vuelidate/core'
import { findKey } from 'lodash-es'
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

      switch (arg.type) {
        case ETHEREUM_TYPES.address:
          return checkIsAddress(arg.value)
        case ETHEREUM_TYPES.bool:
          return checkIsBooleanString(arg.value)
        case ETHEREUM_TYPES.boolArray:
          return checkIsBooleanArrayJsonString(arg.value)
        case ETHEREUM_TYPES.bytes:
          return checkIsBytesLike(arg.value)
        case ETHEREUM_TYPES.bytes1:
          return checkIsBytesLike(arg.value, 1)
        case ETHEREUM_TYPES.bytes2:
          return checkIsBytesLike(arg.value, 2)
        case ETHEREUM_TYPES.bytes3:
          return checkIsBytesLike(arg.value, 3)
        case ETHEREUM_TYPES.bytes4:
          return checkIsBytesLike(arg.value, 4)
        case ETHEREUM_TYPES.bytes5:
          return checkIsBytesLike(arg.value, 5)
        case ETHEREUM_TYPES.bytes6:
          return checkIsBytesLike(arg.value, 6)
        case ETHEREUM_TYPES.bytes7:
          return checkIsBytesLike(arg.value, 7)
        case ETHEREUM_TYPES.bytes8:
          return checkIsBytesLike(arg.value, 8)
        case ETHEREUM_TYPES.bytes9:
          return checkIsBytesLike(arg.value, 9)
        case ETHEREUM_TYPES.bytes10:
          return checkIsBytesLike(arg.value, 10)
        case ETHEREUM_TYPES.bytes11:
          return checkIsBytesLike(arg.value, 11)
        case ETHEREUM_TYPES.bytes12:
          return checkIsBytesLike(arg.value, 12)
        case ETHEREUM_TYPES.bytes13:
          return checkIsBytesLike(arg.value, 13)
        case ETHEREUM_TYPES.bytes14:
          return checkIsBytesLike(arg.value, 14)
        case ETHEREUM_TYPES.bytes15:
          return checkIsBytesLike(arg.value, 15)
        case ETHEREUM_TYPES.bytes16:
          return checkIsBytesLike(arg.value, 16)
        case ETHEREUM_TYPES.bytes17:
          return checkIsBytesLike(arg.value, 17)
        case ETHEREUM_TYPES.bytes18:
          return checkIsBytesLike(arg.value, 18)
        case ETHEREUM_TYPES.bytes19:
          return checkIsBytesLike(arg.value, 19)
        case ETHEREUM_TYPES.bytes20:
          return checkIsBytesLike(arg.value, 20)
        case ETHEREUM_TYPES.bytes21:
          return checkIsBytesLike(arg.value, 21)
        case ETHEREUM_TYPES.bytes22:
          return checkIsBytesLike(arg.value, 22)
        case ETHEREUM_TYPES.bytes23:
          return checkIsBytesLike(arg.value, 23)
        case ETHEREUM_TYPES.bytes24:
          return checkIsBytesLike(arg.value, 24)
        case ETHEREUM_TYPES.bytes25:
          return checkIsBytesLike(arg.value, 25)
        case ETHEREUM_TYPES.bytes26:
          return checkIsBytesLike(arg.value, 26)
        case ETHEREUM_TYPES.bytes27:
          return checkIsBytesLike(arg.value, 27)
        case ETHEREUM_TYPES.bytes28:
          return checkIsBytesLike(arg.value, 28)
        case ETHEREUM_TYPES.bytes29:
          return checkIsBytesLike(arg.value, 29)
        case ETHEREUM_TYPES.bytes30:
          return checkIsBytesLike(arg.value, 30)
        case ETHEREUM_TYPES.bytes31:
          return checkIsBytesLike(arg.value, 31)
        case ETHEREUM_TYPES.bytes32:
          return checkIsBytesLike(arg.value, 32)
        case ETHEREUM_TYPES.bytesArray:
          return checkIsBytesLikeArrayJsonString(arg.value)
        case ETHEREUM_TYPES.bytes1Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 1)
        case ETHEREUM_TYPES.bytes2Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 2)
        case ETHEREUM_TYPES.bytes3Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 3)
        case ETHEREUM_TYPES.bytes4Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 4)
        case ETHEREUM_TYPES.bytes5Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 5)
        case ETHEREUM_TYPES.bytes6Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 6)
        case ETHEREUM_TYPES.bytes7Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 7)
        case ETHEREUM_TYPES.bytes8Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 8)
        case ETHEREUM_TYPES.bytes9Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 9)
        case ETHEREUM_TYPES.bytes10Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 10)
        case ETHEREUM_TYPES.bytes11Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 11)
        case ETHEREUM_TYPES.bytes12Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 12)
        case ETHEREUM_TYPES.bytes13Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 13)
        case ETHEREUM_TYPES.bytes14Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 14)
        case ETHEREUM_TYPES.bytes15Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 15)
        case ETHEREUM_TYPES.bytes16Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 16)
        case ETHEREUM_TYPES.bytes17Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 17)
        case ETHEREUM_TYPES.bytes18Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 18)
        case ETHEREUM_TYPES.bytes19Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 19)
        case ETHEREUM_TYPES.bytes20Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 20)
        case ETHEREUM_TYPES.bytes21Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 21)
        case ETHEREUM_TYPES.bytes22Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 22)
        case ETHEREUM_TYPES.bytes23Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 23)
        case ETHEREUM_TYPES.bytes24Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 24)
        case ETHEREUM_TYPES.bytes25Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 25)
        case ETHEREUM_TYPES.bytes26Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 26)
        case ETHEREUM_TYPES.bytes27Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 27)
        case ETHEREUM_TYPES.bytes28Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 28)
        case ETHEREUM_TYPES.bytes29Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 29)
        case ETHEREUM_TYPES.bytes30Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 30)
        case ETHEREUM_TYPES.bytes31Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 31)
        case ETHEREUM_TYPES.bytes32Array:
          return checkIsBytesLikeArrayJsonString(arg.value, 32)
        case ETHEREUM_TYPES.string:
          return checkIsString(arg.value)
        case ETHEREUM_TYPES.uint:
          return checkIsUintLike(arg.value)
        case ETHEREUM_TYPES.uint8:
          return checkIsUintLike(arg.value, 8)
        case ETHEREUM_TYPES.uint16:
          return checkIsUintLike(arg.value, 16)
        case ETHEREUM_TYPES.uint24:
          return checkIsUintLike(arg.value, 24)
        case ETHEREUM_TYPES.uint32:
          return checkIsUintLike(arg.value, 32)
        case ETHEREUM_TYPES.uint40:
          return checkIsUintLike(arg.value, 40)
        case ETHEREUM_TYPES.uint48:
          return checkIsUintLike(arg.value, 48)
        case ETHEREUM_TYPES.uint56:
          return checkIsUintLike(arg.value, 56)
        case ETHEREUM_TYPES.uint64:
          return checkIsUintLike(arg.value, 64)
        case ETHEREUM_TYPES.uint72:
          return checkIsUintLike(arg.value, 72)
        case ETHEREUM_TYPES.uint80:
          return checkIsUintLike(arg.value, 80)
        case ETHEREUM_TYPES.uint88:
          return checkIsUintLike(arg.value, 88)
        case ETHEREUM_TYPES.uint96:
          return checkIsUintLike(arg.value, 96)
        case ETHEREUM_TYPES.uint104:
          return checkIsUintLike(arg.value, 104)
        case ETHEREUM_TYPES.uint112:
          return checkIsUintLike(arg.value, 112)
        case ETHEREUM_TYPES.uint120:
          return checkIsUintLike(arg.value, 120)
        case ETHEREUM_TYPES.uint128:
          return checkIsUintLike(arg.value, 128)
        case ETHEREUM_TYPES.uint136:
          return checkIsUintLike(arg.value, 136)
        case ETHEREUM_TYPES.uint144:
          return checkIsUintLike(arg.value, 144)
        case ETHEREUM_TYPES.uint152:
          return checkIsUintLike(arg.value, 152)
        case ETHEREUM_TYPES.uint160:
          return checkIsUintLike(arg.value, 160)
        case ETHEREUM_TYPES.uint168:
          return checkIsUintLike(arg.value, 168)
        case ETHEREUM_TYPES.uint176:
          return checkIsUintLike(arg.value, 176)
        case ETHEREUM_TYPES.uint184:
          return checkIsUintLike(arg.value, 184)
        case ETHEREUM_TYPES.uint192:
          return checkIsUintLike(arg.value, 192)
        case ETHEREUM_TYPES.uint200:
          return checkIsUintLike(arg.value, 200)
        case ETHEREUM_TYPES.uint208:
          return checkIsUintLike(arg.value, 208)
        case ETHEREUM_TYPES.uint216:
          return checkIsUintLike(arg.value, 216)
        case ETHEREUM_TYPES.uint224:
          return checkIsUintLike(arg.value, 224)
        case ETHEREUM_TYPES.uint232:
          return checkIsUintLike(arg.value, 232)
        case ETHEREUM_TYPES.uint240:
          return checkIsUintLike(arg.value, 240)
        case ETHEREUM_TYPES.uint248:
          return checkIsUintLike(arg.value, 248)
        case ETHEREUM_TYPES.uint256:
          return checkIsUintLike(arg.value, 256)
        case ETHEREUM_TYPES.uintArray:
          return checkIsUnitLikeArrayJsonString(arg.value)
        case ETHEREUM_TYPES.uint8Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 8)
        case ETHEREUM_TYPES.uint16Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 16)
        case ETHEREUM_TYPES.uint24Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 24)
        case ETHEREUM_TYPES.uint32Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 32)
        case ETHEREUM_TYPES.uint40Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 40)
        case ETHEREUM_TYPES.uint48Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 48)
        case ETHEREUM_TYPES.uint56Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 56)
        case ETHEREUM_TYPES.uint64Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 64)
        case ETHEREUM_TYPES.uint72Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 72)
        case ETHEREUM_TYPES.uint80Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 80)
        case ETHEREUM_TYPES.uint88Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 88)
        case ETHEREUM_TYPES.uint96Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 96)
        case ETHEREUM_TYPES.uint104Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 104)
        case ETHEREUM_TYPES.uint112Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 112)
        case ETHEREUM_TYPES.uint120Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 120)
        case ETHEREUM_TYPES.uint128Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 128)
        case ETHEREUM_TYPES.uint136Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 136)
        case ETHEREUM_TYPES.uint144Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 144)
        case ETHEREUM_TYPES.uint152Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 152)
        case ETHEREUM_TYPES.uint160Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 160)
        case ETHEREUM_TYPES.uint168Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 168)
        case ETHEREUM_TYPES.uint176Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 176)
        case ETHEREUM_TYPES.uint184Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 184)
        case ETHEREUM_TYPES.uint192Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 192)
        case ETHEREUM_TYPES.uint200Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 200)
        case ETHEREUM_TYPES.uint208Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 208)
        case ETHEREUM_TYPES.uint216Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 216)
        case ETHEREUM_TYPES.uint224Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 224)
        case ETHEREUM_TYPES.uint232Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 232)
        case ETHEREUM_TYPES.uint240Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 240)
        case ETHEREUM_TYPES.uint248Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 248)
        case ETHEREUM_TYPES.uint256Array:
          return checkIsUnitLikeArrayJsonString(arg.value, 256)
        default:
          return false
      }
    },
    $message: () => {
      const keyOfType = findKey(ETHEREUM_TYPES, type => type === _arg.type)
      const message = keyOfType
        ? t(`validations.field-error_abiEncodeForm_funcArgValue--${keyOfType}`)
        : ''

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

  switch (arg.type) {
    case ETHEREUM_TYPES.boolArray:
    case ETHEREUM_TYPES.bytesArray:
    case ETHEREUM_TYPES.bytes1Array:
    case ETHEREUM_TYPES.bytes2Array:
    case ETHEREUM_TYPES.bytes3Array:
    case ETHEREUM_TYPES.bytes4Array:
    case ETHEREUM_TYPES.bytes5Array:
    case ETHEREUM_TYPES.bytes6Array:
    case ETHEREUM_TYPES.bytes7Array:
    case ETHEREUM_TYPES.bytes8Array:
    case ETHEREUM_TYPES.bytes9Array:
    case ETHEREUM_TYPES.bytes10Array:
    case ETHEREUM_TYPES.bytes11Array:
    case ETHEREUM_TYPES.bytes12Array:
    case ETHEREUM_TYPES.bytes13Array:
    case ETHEREUM_TYPES.bytes14Array:
    case ETHEREUM_TYPES.bytes15Array:
    case ETHEREUM_TYPES.bytes16Array:
    case ETHEREUM_TYPES.bytes17Array:
    case ETHEREUM_TYPES.bytes18Array:
    case ETHEREUM_TYPES.bytes19Array:
    case ETHEREUM_TYPES.bytes20Array:
    case ETHEREUM_TYPES.bytes21Array:
    case ETHEREUM_TYPES.bytes22Array:
    case ETHEREUM_TYPES.bytes23Array:
    case ETHEREUM_TYPES.bytes24Array:
    case ETHEREUM_TYPES.bytes25Array:
    case ETHEREUM_TYPES.bytes26Array:
    case ETHEREUM_TYPES.bytes27Array:
    case ETHEREUM_TYPES.bytes28Array:
    case ETHEREUM_TYPES.bytes29Array:
    case ETHEREUM_TYPES.bytes30Array:
    case ETHEREUM_TYPES.bytes31Array:
    case ETHEREUM_TYPES.bytes32Array:
    case ETHEREUM_TYPES.uintArray:
    case ETHEREUM_TYPES.uint8Array:
    case ETHEREUM_TYPES.uint16Array:
    case ETHEREUM_TYPES.uint24Array:
    case ETHEREUM_TYPES.uint32Array:
    case ETHEREUM_TYPES.uint40Array:
    case ETHEREUM_TYPES.uint48Array:
    case ETHEREUM_TYPES.uint56Array:
    case ETHEREUM_TYPES.uint64Array:
    case ETHEREUM_TYPES.uint72Array:
    case ETHEREUM_TYPES.uint80Array:
    case ETHEREUM_TYPES.uint88Array:
    case ETHEREUM_TYPES.uint96Array:
    case ETHEREUM_TYPES.uint104Array:
    case ETHEREUM_TYPES.uint112Array:
    case ETHEREUM_TYPES.uint120Array:
    case ETHEREUM_TYPES.uint128Array:
    case ETHEREUM_TYPES.uint136Array:
    case ETHEREUM_TYPES.uint144Array:
    case ETHEREUM_TYPES.uint152Array:
    case ETHEREUM_TYPES.uint160Array:
    case ETHEREUM_TYPES.uint168Array:
    case ETHEREUM_TYPES.uint176Array:
    case ETHEREUM_TYPES.uint184Array:
    case ETHEREUM_TYPES.uint192Array:
    case ETHEREUM_TYPES.uint200Array:
    case ETHEREUM_TYPES.uint208Array:
    case ETHEREUM_TYPES.uint216Array:
    case ETHEREUM_TYPES.uint224Array:
    case ETHEREUM_TYPES.uint232Array:
    case ETHEREUM_TYPES.uint240Array:
    case ETHEREUM_TYPES.uint248Array:
    case ETHEREUM_TYPES.uint256Array:
      return JSON.parse(arg.value as string)
    case ETHEREUM_TYPES.bool:
      return arg.value === 'true'
    default:
      return arg.value
  }
}
