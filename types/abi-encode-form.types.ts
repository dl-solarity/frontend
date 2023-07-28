export type FuncArg = {
  id: string
  type: string | number
  value: string | number
}

export type FuncArgErrorMsgInfo = {
  id: FuncArg['id']
  field: 'type' | 'value'
  message: string
}
