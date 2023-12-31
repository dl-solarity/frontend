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
  btnText?: string
}

export type DecodeType = 'text' | 'hex'

export type FieldOption = {
  value: string | number
  title: string
}

export type HashFunction = (str: string, type: 'text' | 'hex') => string

export type ProjectInfoCard = {
  title: string
  message: string
  btnText: string
  href?: string
  route?: string
}

export type Tab = {
  title: string
  id: string
  route?: string
}
