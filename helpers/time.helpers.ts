import { PERIOD_IDS, PERIOD_CONSTANTS } from '@/enums'
import { duration } from 'dayjs'
import { Periods, PeriodKeys } from 'types/time.types'

export const getTransformedTime = (dateString: string) => {
  const dateUnits = Object.entries(PERIOD_IDS)

  const duration = dateUnits.reduce((accumulator, [timeKey, timeId]) => {
    const regex = new RegExp(`(?<value>\\d+\\.?\\d*)\\s*(${timeId})`, 'g')
    const matches = dateString.matchAll(regex)
    const parsedValue = [...matches].reduce((_accumulator, _prevValue) => {
      if (_prevValue.groups) {
        const { value } = _prevValue.groups
        _accumulator += Number(value)
      }
      return _accumulator
    }, 0)

    accumulator[timeKey as PeriodKeys] = parsedValue
    return accumulator
  }, {} as Periods)

  return getNormalizedTime(duration)
}

export const getNormalizedTime = (rawDuration: Periods): Periods => {
  const normalizedTime = { ...rawDuration }
  const seconds = getTotalDurationAsSeconds(rawDuration)
  let totalDuration = duration(0)

  totalDuration = totalDuration.add(seconds, 'seconds')

  normalizedTime.seconds = totalDuration.seconds()
  normalizedTime.minutes = totalDuration.minutes()
  normalizedTime.hours = totalDuration.hours()
  // Calculated because we have a year as 360 days (NOT 365)
  // so DayJs can't handle it properly
  let daysLeft = Math.floor(
    totalDuration.asSeconds() /
      (PERIOD_CONSTANTS.hoursInDay * PERIOD_CONSTANTS.secondsInHour),
  )

  normalizedTime.years = Math.floor(daysLeft / PERIOD_CONSTANTS.daysInYear)
  daysLeft %= PERIOD_CONSTANTS.daysInYear

  normalizedTime.months = Math.floor(daysLeft / PERIOD_CONSTANTS.daysInMonth)
  daysLeft %= PERIOD_CONSTANTS.daysInMonth

  normalizedTime.weeks = Math.floor(daysLeft / PERIOD_CONSTANTS.daysInWeek)
  daysLeft %= PERIOD_CONSTANTS.daysInWeek

  normalizedTime.days = daysLeft

  return normalizedTime
}

export const getTotalDurationAsSeconds = (rawDuration: Periods) => {
  let totalDuration = duration(0)

  totalDuration = totalDuration
    .add(rawDuration.seconds, 'seconds')
    .add(rawDuration.minutes, 'minutes')
    .add(rawDuration.hours, 'hours')
    .add(rawDuration.days, 'days')
    .add(rawDuration.weeks * PERIOD_CONSTANTS.daysInWeek, 'days')
    .add(rawDuration.months * PERIOD_CONSTANTS.daysInMonth, 'days')
    .add(rawDuration.years * PERIOD_CONSTANTS.daysInYear, 'days')

  return totalDuration.asSeconds()
}
