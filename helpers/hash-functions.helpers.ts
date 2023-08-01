import { ethers } from 'ethers'
import { type HashFunction } from '@/types'

export function keccak256(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = ethers.keccak256(
    type === 'text' ? ethers.toUtf8Bytes(str) : ethers.toBeHex(str),
  )
  return ethers.hexlify(dataHexString)
}

export function sha256(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = ethers.sha256(
    type === 'text' ? ethers.toUtf8Bytes(str) : ethers.toBeHex(str),
  )
  return ethers.hexlify(dataHexString)
}

export function ripemd160(
  ...[str, type]: Parameters<HashFunction>
): ReturnType<HashFunction> {
  const dataHexString = ethers.ripemd160(
    type === 'text' ? ethers.toUtf8Bytes(str) : ethers.toBeHex(str),
  )
  return ethers.hexlify(dataHexString)
}
