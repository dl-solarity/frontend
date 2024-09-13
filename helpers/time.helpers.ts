import { DATE_IDS, TIME_CONSTANTS } from '@/enums'
import { duration } from 'dayjs'

type RawDateType = Record<keyof typeof DATE_IDS, number>

export const normalizeTime = (rawDate: RawDateType) => {
  const seconds = getTotalDurationAsSeconds(rawDate)

  let totalDuration = duration(0)

  totalDuration = totalDuration.add(seconds, 'seconds')

  rawDate.seconds = totalDuration.seconds()
  rawDate.minutes = totalDuration.minutes()
  rawDate.hours = totalDuration.hours()
  // Calculated because we have a year as 360 days (NOT 365)
  // so DayJs can't handle it properly
  let daysLeft = Math.floor(
    totalDuration.asSeconds() /
      (TIME_CONSTANTS.hoursInDay * TIME_CONSTANTS.secondsInHour),
  )

  rawDate.years = Math.floor(daysLeft / TIME_CONSTANTS.daysInYear)
  daysLeft %= TIME_CONSTANTS.daysInYear

  rawDate.months = Math.floor(daysLeft / TIME_CONSTANTS.daysInMonth)
  daysLeft %= TIME_CONSTANTS.daysInMonth

  rawDate.weeks = Math.floor(daysLeft / TIME_CONSTANTS.daysInWeek)
  daysLeft %= TIME_CONSTANTS.daysInWeek

  rawDate.days = daysLeft
}

export const getTotalDurationAsSeconds = (rawDate: RawDateType) => {
  let totalDuration = duration(0)

  totalDuration = totalDuration
    .add(rawDate.seconds, 'seconds')
    .add(rawDate.minutes, 'minutes')
    .add(rawDate.hours, 'hours')
    .add(rawDate.days, 'days')
    .add(rawDate.weeks * TIME_CONSTANTS.daysInWeek, 'days')
    .add(rawDate.months * TIME_CONSTANTS.daysInMonth, 'days')
    .add(rawDate.years * TIME_CONSTANTS.daysInYear, 'days')

  return totalDuration.asSeconds()
}

export const resetRawDate = (rawDate: RawDateType) => {
  Object.keys(rawDate).forEach(
    key => (rawDate[key as keyof typeof rawDate] = 0),
  )
}

export const updateRawDate = (dateString: string, rawDate: RawDateType) => {
  const dateUnits = Object.values(DATE_IDS).join('|')
  const regex = new RegExp(`(\\d+)\\s*(${dateUnits})`, 'g')

  let match
  while ((match = regex.exec(dateString))) {
    const value = parseInt(match[1])
    const unit = match[2] as DATE_IDS

    switch (unit) {
      case DATE_IDS.seconds:
        rawDate.seconds += value
        break
      case DATE_IDS.minutes:
        rawDate.minutes += value
        break
      case DATE_IDS.hours:
        rawDate.hours += value
        break
      case DATE_IDS.days:
        rawDate.days += value
        break
      case DATE_IDS.months:
        rawDate.months += value
        break
      case DATE_IDS.years:
        rawDate.years += value
        break
      case DATE_IDS.weeks:
        rawDate.weeks += value
        break
    }
  }

  normalizeTime(rawDate)
}
