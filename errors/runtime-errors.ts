export class RuntimeError extends Error {}

export class FunctionSignatureFetchError extends RuntimeError {
  message = 'failed to get function signature'
}

export class FunctionFragmentGuessError extends RuntimeError {
  message = 'failed to guess function fragment'
}

export class ParamTypesGuessError extends RuntimeError {
  message = 'failed guess params types'
}

export class AbiDecodeError extends RuntimeError {
  message = 'failed to decode abi'
}
