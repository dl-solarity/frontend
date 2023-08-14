import { errors } from '@/errors'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

export function getErrorMessage(error: Error | unknown): string {
  if (error instanceof Error) {
    switch (error.constructor) {
      case errors.FuncSignatureFetchError:
        return t('errors.failed-to-fetch-func-signature')
      case errors.FunctionFragmentGuessError:
        return t('errors.failed-to-guess-func-fragment')
      case errors.ParamTypesGuessError:
        return t('errors.failed-to-guess-param-types')
    }
  }

  return t('errors.default')
}
