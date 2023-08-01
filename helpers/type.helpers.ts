import { ETHEREUM_TYPES } from '@/enums'
import { AddressLike, BytesLike } from '@/types'
import { isAddress, isBytesLike } from 'ethers'
import { BigNumber } from 'bignumber.js'

export function checkIsAddress(value: unknown): boolean {
  return isAddress(value)
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

export function checkIsBytesLike(
  value: unknown,
  size?: number,
): value is BytesLike {
  return size
    ? isBytesLike(value) && value.length === 2 * size + 2 // 0x
    : isBytesLike(value)
}

export function checkIsBytesLikeArrayJsonString(
  value: unknown,
  bytesSize?: number,
): boolean {
  try {
    return JSON.parse(value as string).every((v: unknown) =>
      checkIsBytesLike(v, bytesSize),
    )
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

export function checkIsUintLike(value: unknown, size?: number): boolean {
  const bigNumber = BigNumber(value as BigNumber.Value)
  const isUintLike = bigNumber.isPositive() && bigNumber.isFinite()

  if (isUintLike && size) {
    return bigNumber.isLessThanOrEqualTo(BigNumber(2).pow(size).minus(1))
  }

  return isUintLike
}

export function checkIsUnitLikeArrayJsonString(
  value: unknown,
  uintSize?: number,
): boolean {
  try {
    return JSON.parse(value as string).every((v: unknown) =>
      checkIsUintLike(v, uintSize),
    )
  } catch {
    return false
  }
}
