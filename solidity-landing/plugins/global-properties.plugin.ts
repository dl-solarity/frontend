import { ICON_NAMES, ROUTE_NAMES } from '@/enums'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      icons: ICON_NAMES,
      routes: ROUTE_NAMES,
    },
  }
})
