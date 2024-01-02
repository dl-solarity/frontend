import { errors } from '@/errors'
import { i18n } from '~/plugins/localization'

const { t } = i18n.global

export function getErrorMessage(error: Error | unknown): string {
  if (error instanceof Error) {
    switch (error.constructor) {
      case errors.FunctionSignatureFetchError:
        return t('errors.failed-to-fetch-func-signature')
      case errors.FunctionFragmentGuessError:
        return t('errors.failed-to-guess-func-fragment')
      case errors.ParamTypesGuessError:
        return t('errors.failed-to-guess-param-types')
      case errors.AbiDecodeError:
        return t('errors.failed-to-decode-abi')
      case errors.IncompatibleDataReceivedError:
        return t('errors.incompatible-data-received')

      case errors.linkShortenerServiceErrors.CreateLinkFetchError:
        return t('errors.failed-to-create-link')
      case errors.linkShortenerServiceErrors.GetDataByLinkFetchError:
        return t('errors.failed-to-get-data-by-link')
    }
  }

  return t('errors.default')
}
