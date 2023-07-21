import { ethers } from 'ethers'
import { DecodeType } from '@/types'

export function keccak256(str: string, type: DecodeType) {
  switch (type) {
    case 'text': {
      const b = ethers.keccak256(ethers.toUtf8Bytes(str))
      return ethers.hexlify(b)
    }
    default: {
      const b = ethers.keccak256(ethers.toBeHex(str))
      return ethers.hexlify(b)
    }
  }
}

export function sha256(str: string, type: DecodeType) {
  switch (type) {
    case 'text': {
      const b = ethers.sha256(ethers.toUtf8Bytes(str))
      return ethers.hexlify(b)
    }
    default: {
      const b = ethers.sha256(ethers.toBeHex(str))
      return ethers.hexlify(b)
    }
  }
}

export function ripemd160(str: string, type: DecodeType) {
  switch (type) {
    case 'text': {
      const b = ethers.ripemd160(ethers.toUtf8Bytes(str))
      return ethers.hexlify(b)
    }
    default: {
      const b = ethers.ripemd160(ethers.toBeHex(str))
      return ethers.hexlify(b)
    }
  }
}
