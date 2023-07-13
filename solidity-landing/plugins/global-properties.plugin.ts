import { ICON_NAMES } from '@/enums'
import { ROUTE_PATH } from '@/constants'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      icons: ICON_NAMES,
      routes: ROUTE_PATH,
    },
  }
})
