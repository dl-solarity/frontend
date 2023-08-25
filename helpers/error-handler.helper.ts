import log from 'loglevel'
import { bus, BUS_EVENTS } from '@/helpers'
import { getErrorMessage } from './errors.helpers'

export class ErrorHandler {
  static process(error: Error | unknown, errorMessage = ''): void {
    const msgTranslation = errorMessage || getErrorMessage(error)
    bus.emit(BUS_EVENTS.error, msgTranslation)

    ErrorHandler.processWithoutFeedback(error)
  }

  static processWithoutFeedback(error: Error | unknown): void {
    log.error(error)
  }
}
