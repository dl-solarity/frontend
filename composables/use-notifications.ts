import { AppNotification } from '#components'
import { ICON_NAMES } from '@/enums'
import { CommonNotificationTypes, NotificationObjectPayload } from '@/types'
import isObject from 'lodash/isObject'
import { TYPE, useToast } from 'vue-toastification'
import { i18n } from '~/plugins/localization'

export const useNotifications = () => {
  const toast = useToast()

  const { t } = i18n.global

  const defaultTitles = {
    [TYPE.SUCCESS]: t('notification.default-title-success'),
    [TYPE.ERROR]: t('notification.default-title-error'),
    [TYPE.WARNING]: t('notification.default-title-warning'),
    [TYPE.INFO]: t('notification.default-title-info'),
    [TYPE.DEFAULT]: t('notification.default-title-default'),
  }
  const defaultMessages = {
    [TYPE.SUCCESS]: t('notification.default-message-success'),
    [TYPE.ERROR]: t('notification.default-message-error'),
    [TYPE.WARNING]: t('notification.default-message-warning'),
    [TYPE.INFO]: t('notification.default-message-info'),
    [TYPE.DEFAULT]: t('notification.default-message-default'),
  }
  const defaultIconNames = {
    [TYPE.SUCCESS]: ICON_NAMES.checkCircle,
    [TYPE.ERROR]: ICON_NAMES.exclamationCircle,
    [TYPE.WARNING]: ICON_NAMES.exclamationTriangle,
    [TYPE.INFO]: ICON_NAMES.exclamationCircle,
    [TYPE.DEFAULT]: ICON_NAMES.exclamationCircle,
  }

  const showToast = (
    messageType = 'default' as CommonNotificationTypes,
    payload?: string | NotificationObjectPayload,
  ) => {
    let title = ''
    let message = ''
    let iconName: string | undefined

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

    return toast(
      {
        component: AppNotification,
        props: {
          ...(title && { title }),
          message,
          ...(iconName && { iconName }),
        },
      },
      {
        icon: false,
        type: {
          default: TYPE.DEFAULT,
          info: TYPE.INFO,
          success: TYPE.SUCCESS,
          error: TYPE.ERROR,
          warning: TYPE.WARNING,
        }[messageType],
        timeout: 30000,
        closeOnClick: false,
        closeButton: false,
      },
    )
  }

  const removeToast = (id: string | number) => toast.dismiss(id)

  return { showToast, removeToast }
}

export * from 'vue-toastification'
