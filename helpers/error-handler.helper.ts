import log from 'loglevel'
import { bus, BUS_EVENTS } from '@/helpers'
import { i18n } from '~/plugins/localization'

export class ErrorHandler {
  static process(error: Error | unknown, errorMessage = ''): void {
    const msgTranslation = errorMessage || ErrorHandler._getErrorMessage(error)
    bus.emit(BUS_EVENTS.error, msgTranslation)

    ErrorHandler.processWithoutFeedback(error)
  }

  static processWithoutFeedback(error: Error | unknown): void {
    log.error(error)
  }

  static _getErrorMessage(error: Error | unknown): string {
    let errorMessage = ''

    const { t } = i18n.global

    if (error instanceof Error)
      switch (error.constructor) {
        default: {
          errorMessage = t('errors.default')
        }
      }

    return errorMessage
  }
}
