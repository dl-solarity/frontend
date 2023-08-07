import { ICON_NAMES } from '@/enums'
export type CommonNotificationTypes =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'

export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: typeof ICON_NAMES | unknown
}

export type ArrayElement<T extends readonly unknown[]> = T[number]

export interface Audit {
  title: string
  imgSrc: string
  fileSize: string
  fileLink: string
  description: string
  btnText?: string
}

export type DecodeType = 'text' | 'hex'

export type FieldOption = {
  value: string | number
  title: string
}

export type HashFunction = (str: string, type: 'text' | 'hex') => string

export type Tab = {
  title: string
  id: string
}
