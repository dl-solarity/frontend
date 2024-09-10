import { DATE_IDS, TIME_CONSTANTS } from '@/enums'
import { duration } from 'dayjs'

type RawDateType = Record<keyof typeof DATE_IDS, number>

export const normalizeTime = (rawDate: RawDateType) => {
  let totalDuration = duration(0)

  totalDuration = totalDuration
    .add(rawDate.seconds, 'seconds')
    .add(rawDate.minutes, 'minutes')
    .add(rawDate.hours, 'hours')
    .add(rawDate.days, 'days')
    .add(rawDate.weeks, 'weeks')
    .add(rawDate.years, 'years')

  rawDate.seconds = totalDuration.seconds()
  rawDate.minutes = totalDuration.minutes()
  rawDate.hours = totalDuration.hours()
  // HACK! DayJS doesn't handle this kind of parsing (weeks => years)
  // with integer, so the solution is the expressions below
  // https://day.js.org/docs/en/durations/weeks
  rawDate.days =
    (Math.floor(totalDuration.asDays()) -
      Math.floor(totalDuration.asYears()) * TIME_CONSTANTS.daysInYear) %
    TIME_CONSTANTS.daysInWeek
  rawDate.weeks = Math.floor(
    (Math.floor(totalDuration.asDays()) -
      Math.floor(totalDuration.asYears()) * TIME_CONSTANTS.daysInYear) /
      TIME_CONSTANTS.daysInWeek,
  )
  rawDate.years = totalDuration.years()

  return rawDate
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
