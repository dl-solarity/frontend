import { NotificationObjectPayload } from '@/types'
import { EventEmitter } from '@distributedlab/tools'

export enum BUS_EVENTS {
  error = 'error',
  warning = 'warning',
  success = 'success',
  info = 'info',
  default = 'default',
  toggleSidebar = 'toggle-sidebar',
}

export type DefaultBusEventMap = {
  [BUS_EVENTS.success]: string | NotificationObjectPayload
  [BUS_EVENTS.error]: string | NotificationObjectPayload
  [BUS_EVENTS.warning]: string | NotificationObjectPayload
  [BUS_EVENTS.info]: string | NotificationObjectPayload
  [BUS_EVENTS.default]: string | NotificationObjectPayload
  [BUS_EVENTS.toggleSidebar]: unknown
}

export const bus = new EventEmitter<DefaultBusEventMap>()
