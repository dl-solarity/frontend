import { TIME_IDS } from 'enums'

export type TimeKeysType = keyof typeof TIME_IDS
export type TimeType = Record<TimeKeysType, number>
