export type FuncArg = {
  id: string
  type: string
  value: string
}

export type FuncArgErrorMsgInfo = {
  id: FuncArg['id']
  field: 'type' | 'value'
  message: string
}
