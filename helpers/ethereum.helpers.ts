import { ParamType } from 'ethers'

export function createFunctionSignature(
  paramTypes: ParamType[],
  name?: string,
): string {
  const types = paramTypes.map(paramType =>
    paramType.type.replaceAll('tuple(', '(').replaceAll('(', 'tuple('),
  )

  return name
    ? `${name}(${types.join(',')})`
    : `constructor(${types.join(',')})`
}
