import { PERIOD_IDS } from 'enums/period.enum'

export type PeriodKeys = keyof typeof PERIOD_IDS
export type Periods = Record<PeriodKeys, number>
