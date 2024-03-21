import {
  hexlify,
  keccak256 as _keccak256,
  sha256 as _sha256,
  ripemd160 as _ripemd160,
  toUtf8Bytes,
} from 'ethers'
import { type HashFunction } from '@/types'

export const keccak256: HashFunction = (str, type) => {
  const dataHexString = _keccak256(getHashArg(str, type));

  return hexlify(dataHexString)
}

export const sha256: HashFunction = (str, type) => {
  const dataHexString = _sha256(getHashArg(str, type));

  return hexlify(dataHexString)
}

export const ripemd160: HashFunction = (str, type) => {
  const dataHexString = _ripemd160(getHashArg(str, type));

  return hexlify(dataHexString)
}

const getHashArg = (str: string, type: "text" | "hex" ) => {
  if (type === "text") {
    return toUtf8Bytes(str);
  }

  if (str.length % 2 == 1) {
    str = "0x0" + str.slice(2);
  }

  return hexlify(str);
}
