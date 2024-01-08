export class RuntimeError extends Error {}

export class FunctionSignatureFetchError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed to get function signature'
}

export class FunctionFragmentGuessError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed to guess function fragment'
}

export class ParamTypesGuessError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed guess params types'
}

export class AbiDecodeError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'failed to decode abi'
}

export class IncompatibleDataReceivedError extends RuntimeError {
  // TODO: refactoring by web-kit
  message = 'incompatible data received'
}
