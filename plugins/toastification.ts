import { defineNuxtPlugin } from '#imports'
import { useNotifications } from '@/composables'
import { bus, BUS_EVENTS } from '@/helpers'
import Toast, { TYPE } from 'vue-toastification'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast)
  const { showToast } = useNotifications()

  bus.on(BUS_EVENTS.success, payload => showToast(TYPE.SUCCESS, payload))
  bus.on(BUS_EVENTS.warning, payload => showToast(TYPE.WARNING, payload))
  bus.on(BUS_EVENTS.error, payload => showToast(TYPE.ERROR, payload))
  bus.on(BUS_EVENTS.info, payload => showToast(TYPE.INFO, payload))
  bus.on(BUS_EVENTS.default, payload => showToast(TYPE.DEFAULT, payload))
})
