import {
  hexlify,
  keccak256 as _keccak256,
  sha256 as _sha256,
  ripemd160 as _ripemd160,
  toBeHex,
  toUtf8Bytes,
} from 'ethers'
import { type HashFunction } from '@/types'

export function keccak256(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = _keccak256(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}

export function sha256(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = _sha256(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}

export function ripemd160(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = _ripemd160(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}
