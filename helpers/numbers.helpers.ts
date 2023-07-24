import { BigNumber } from 'bignumber.js'

export function toUnits(value: number | string, decimals = 0) {
  return BigNumber(value)
    .multipliedBy(10 ** decimals)
    .toFixed()
}

export function fromUnits(value: number | string, decimals = 0) {
  return BigNumber(value)
    .dividedBy(10 ** decimals)
    .toFixed()
}
