import { TIME_IDS, TIME_CONSTANTS } from '@/enums'
import { duration } from 'dayjs'
import { Time, TimeKeys } from 'types/time.types'

export const getTransformedTime = (dateString: string) => {
  const dateUnits = Object.entries(TIME_IDS)

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

    accumulator[timeKey as TimeKeys] = parsedValue
    return accumulator
  }, {} as Time)

  return getNormalizedTime(duration)
}

export const getNormalizedTime = (rawDuration: Time): Time => {
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
      (TIME_CONSTANTS.hoursInDay * TIME_CONSTANTS.secondsInHour),
  )

  normalizedTime.years = Math.floor(daysLeft / TIME_CONSTANTS.daysInYear)
  daysLeft %= TIME_CONSTANTS.daysInYear

  normalizedTime.months = Math.floor(daysLeft / TIME_CONSTANTS.daysInMonth)
  daysLeft %= TIME_CONSTANTS.daysInMonth

  normalizedTime.weeks = Math.floor(daysLeft / TIME_CONSTANTS.daysInWeek)
  daysLeft %= TIME_CONSTANTS.daysInWeek

  normalizedTime.days = daysLeft

  return normalizedTime
}

export const getTotalDurationAsSeconds = (rawDuration: Time) => {
  let totalDuration = duration(0)

  totalDuration = totalDuration
    .add(rawDuration.seconds, 'seconds')
    .add(rawDuration.minutes, 'minutes')
    .add(rawDuration.hours, 'hours')
    .add(rawDuration.days, 'days')
    .add(rawDuration.weeks * TIME_CONSTANTS.daysInWeek, 'days')
    .add(rawDuration.months * TIME_CONSTANTS.daysInMonth, 'days')
    .add(rawDuration.years * TIME_CONSTANTS.daysInYear, 'days')

  return totalDuration.asSeconds()
}
