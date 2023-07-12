import 'vue-toastification/src/scss/index.scss'

import { Notification } from './components'

import Toast, { useToast, TYPE } from 'vue-toastification/src/index'
import { isObject } from 'lodash-es'

import { defineNuxtPlugin } from '#imports'
import { Bus } from '@/helpers'
import { NotificationObjectPayload } from '@/types'
import { ICON_NAMES } from '@/enums'
import { i18n } from '@/plugins/localization'

const toast = useToast()

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast)

  const { t } = i18n.global

  Bus.on(Bus.eventList.success, payload => showToast(TYPE.SUCCESS, payload))
  Bus.on(Bus.eventList.warning, payload => showToast(TYPE.WARNING, payload))
  Bus.on(Bus.eventList.error, payload => showToast(TYPE.ERROR, payload))
  Bus.on(Bus.eventList.info, payload => showToast(TYPE.INFO, payload))
  Bus.on(Bus.eventList.default, payload => showToast(TYPE.DEFAULT, payload))

  const showToast = (
    messageType = TYPE.DEFAULT as TYPE,
    payload?: string | NotificationObjectPayload | unknown,
  ): void => {
    let title = ''
    let message = ''
    let iconName = ''

    const defaultTitles = {
      [TYPE.SUCCESS]: t('notification.default-title-success'),
      [TYPE.ERROR]: t('notification.default-title-error'),
      [TYPE.WARNING]: t('notification.default-title-warning'),
      [TYPE.INFO]: t('notification.default-title-info'),
      [TYPE.DEFAULT]: t('notification.default-title-default'),
    }
    const defaultMessages = {
      [TYPE.DEFAULT]: t('notification.default-message-default'),
      [TYPE.INFO]: t('notification.default-message-info'),
      [TYPE.SUCCESS]: t('notification.default-message-success'),
      [TYPE.ERROR]: t('notification.default-message-error'),
      [TYPE.WARNING]: t('notification.default-message-warning'),
    }
    const defaultIconNames = {
      [TYPE.DEFAULT]: ICON_NAMES.informationCircle,
      [TYPE.INFO]: ICON_NAMES.informationCircle,
      [TYPE.SUCCESS]: ICON_NAMES.checkCircle,
      [TYPE.ERROR]: ICON_NAMES.exclamationCircle,
      [TYPE.WARNING]: ICON_NAMES.exclamation,
    }

    if (isObject(payload)) {
      const msgPayload = payload as NotificationObjectPayload

      title = msgPayload.title || ''
      message = msgPayload.message
      iconName = msgPayload.iconName ? (msgPayload.iconName as string) : ''
    } else if (payload) {
      message = payload as string
    } else {
      message = defaultMessages[messageType]
    }

    if (!title) {
      title = defaultTitles[messageType]
    }
    if (!iconName) {
      iconName = defaultIconNames[messageType]
    }

    toast(
      {
        component: Notification,
        props: {
          ...(title && { title }),
          message,
          ...(iconName && { iconName }),
        },
      },
      {
        icon: false,
        type: messageType,
      },
    )
  }
})
