import 'vue-toastification/src/scss/index.scss'
import Toast, { TYPE } from 'vue-toastification/src/index'
import { defineNuxtPlugin } from '#imports'
import { bus, BUS_EVENTS } from '@/helpers'
import { NotificationObjectPayload } from '@/types'
import { useNotifications } from '@/composables'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast)
  const { showToast } = useNotifications()

  bus.on(BUS_EVENTS.success, payload =>
    showToast(TYPE.SUCCESS, payload as NotificationObjectPayload),
  )
  bus.on(BUS_EVENTS.warning, payload =>
    showToast(TYPE.WARNING, payload as NotificationObjectPayload),
  )
  bus.on(BUS_EVENTS.error, payload =>
    showToast(TYPE.ERROR, payload as NotificationObjectPayload),
  )
  bus.on(BUS_EVENTS.info, payload =>
    showToast(TYPE.INFO, payload as NotificationObjectPayload),
  )
})
