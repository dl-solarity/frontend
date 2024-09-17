import { TIME_IDS } from 'enums'

export type TimeKeys = keyof typeof TIME_IDS
export type Time = Record<TimeKeys, number>
