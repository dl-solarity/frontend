import {
  hexlify,
  keccak256 as _keccak256,
  sha256 as _sha256,
  ripemd160 as _ripemd160,
  toBeHex,
  toUtf8Bytes,
} from 'ethers'
import { type HashFunction } from '@/types'

export const keccak256: HashFunction = (str, type) => {
  const dataHexString = _keccak256(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}

export const sha256: HashFunction = (str, type) => {
  const dataHexString = _sha256(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}

export const ripemd160: HashFunction = (str, type) => {
  const dataHexString = _ripemd160(
    type === 'text' ? toUtf8Bytes(str) : toBeHex(str),
  )

  return hexlify(dataHexString)
}
