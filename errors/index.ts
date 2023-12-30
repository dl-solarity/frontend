import * as linkShortenerServiceErrors from './link-shortener.service.errors'
import * as runtimeErrors from './runtime-errors'

export const errors = {
  ...runtimeErrors,
  linkShortenerServiceErrors,
}

export { linkShortenerServiceErrors }
