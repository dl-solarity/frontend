import { ETHEREUM_TYPES } from '@/enums'
import { BytesLike } from '@/types'
import { isAddress, isBytesLike } from 'ethers'
import { BigNumber } from 'bignumber.js'

export function checkIsAddress(value: unknown): boolean {
  return isAddress(value)
}

export function checkIsBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export function checkIsBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

export function checkIsBooleanString(value: unknown): boolean {
  return value === 'true' || value === 'false'
}

export function checkIsBooleanArrayJsonString(value: unknown): boolean {
  try {
    return JSON.parse(value as string).every(checkIsBoolean)
  } catch {
    return false
  }
}

export function checkIsBytesLike(value: unknown): value is BytesLike {
  return isBytesLike(value)
}

export function checkIsBytesLikeArrayJsonString(value: unknown): boolean {
  try {
    return JSON.parse(value as string).every(checkIsBytesLike)
  } catch {
    return false
  }
}

export function checkIsEthereumType(value: unknown): value is ETHEREUM_TYPES {
  return Object.values(ETHEREUM_TYPES).includes(value as ETHEREUM_TYPES)
}

export function checkIsString(value: unknown): value is string {
  return typeof value === 'string'
}

export function checkIsUintLike(value: unknown): boolean {
  const bigNumber = BigNumber(value as BigNumber.Value)
  return bigNumber.isPositive() && bigNumber.isFinite()
}

export function checkIsUnitLikeArrayJsonString(value: unknown): boolean {
  try {
    return JSON.parse(value as string).every(checkIsUintLike)
  } catch {
    return false
  }
}

export function checkBytesAmount(bytes: BytesLike, amount: number): boolean {
  return bytes.length === 2 * amount + 2 // 0x
}

export function checkUintIsWithinRange(
  uint: BigNumber.Value,
  bitsAmount: number,
): boolean {
  return BigNumber(uint).isLessThanOrEqualTo(
    BigNumber(2).pow(bitsAmount).minus(1),
  )
}
