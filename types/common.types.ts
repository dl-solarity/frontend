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

export interface Audit {
  title: string
  imgSrc: string
  fileSize: string
  fileLink: string
  description: string
  btnText?: string
}
