import { defineNuxtPlugin } from '#imports'
import { ICON_NAMES, ROUTE_NAMES } from '@/enums'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      icons: ICON_NAMES,
      routes: ROUTE_NAMES,
    },
  }
})
