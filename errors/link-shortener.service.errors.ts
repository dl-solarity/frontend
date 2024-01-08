import { RuntimeError } from './runtime-errors'

export class CreateLinkFetchError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed to create link'
}

export class GetDataByLinkFetchError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed to get data by link'
}
