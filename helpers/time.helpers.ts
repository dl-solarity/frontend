import { TIME_IDS, TIME_CONSTANTS } from '@/enums'
import { duration } from 'dayjs'
import { TimeType } from 'types/time.types'

export const getUpdatedDuration = (dateString: string): TimeType => {
  const updatedDuration: TimeType = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
  }
  const dateUnits = Object.values(TIME_IDS).join('|')
  const regex = new RegExp(`(?<value>\\d+)\\s*(?<key>${dateUnits})`, 'g')

  let match
  while ((match = regex.exec(dateString))) {
    const groups = match.groups as {
      key: TIME_IDS
      value: string
    }
    const value = Number(groups.value)
    const key = groups.key

    // TODO:  Discuss solutions such as:
    // 1: switch/case
    // 2. timeKeyMap
    // 3. Full timeIds such as 'days', 'year' and so on...
    // 4. Any another approach?
    switch (key) {
      case TIME_IDS.seconds:
        updatedDuration.seconds += value
        break
      case TIME_IDS.minutes:
        updatedDuration.minutes += value
        break
      case TIME_IDS.hours:
        updatedDuration.hours += value
        break
      case TIME_IDS.days:
        updatedDuration.days += value
        break
      case TIME_IDS.weeks:
        updatedDuration.weeks += value
        break
      case TIME_IDS.months:
        updatedDuration.months += value
        break
      case TIME_IDS.years:
        updatedDuration.years += value
        break
    }
  }

  return getNormalizedTime(updatedDuration)
}

export const getNormalizedTime = (rawDuration: TimeType): TimeType => {
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

export const getTotalDurationAsSeconds = (rawDuration: TimeType) => {
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
