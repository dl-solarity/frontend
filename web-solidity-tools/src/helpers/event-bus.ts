import { EventEmitter } from '@distributedlab/tools'

export enum BUS_EVENTS {
  error = 'error',
  warning = 'warning',
  success = 'success',
  info = 'info',
  toggleSidebar = 'toggle-sidebar',
}

export type DefaultBusEventMap = {
  [BUS_EVENTS.success]: unknown
  [BUS_EVENTS.error]: unknown
  [BUS_EVENTS.warning]: unknown
  [BUS_EVENTS.info]: unknown
  [BUS_EVENTS.toggleSidebar]: unknown
}

export const bus = new EventEmitter<DefaultBusEventMap>()
