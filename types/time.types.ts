import { PERIOD_IDS } from 'enums'

export type PeriodKeys = keyof typeof PERIOD_IDS
export type Periods = Record<PeriodKeys, number>
