import { defineNuxtPlugin } from '#imports'
import { ROUTE_PATH } from '@/constants'
import { ICON_NAMES } from '@/enums'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      icons: ICON_NAMES,
      routes: ROUTE_PATH,
    },
  }
})
