import { Permissions, Notifications } from 'expo'
import Sentry from 'sentry-expo'
import { accountOperations } from '~/store/account'

import { api } from '~/services/api'
import { noticesOperations } from '~/store/notices'

const askForNotificationToken = async () => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return
    }

    const notificationToken = await Notifications.getExpoPushTokenAsync()

    return notificationToken
  } catch (err) {
    Sentry.captureException(err)
    return null
  }
}

const registerPushNotificationToken = async (nickname, avatarUrl, phone, email) => {
  try {
    const pushNotificationToken = await askForNotificationToken()

    await api.post('notification/register', {
      pushNotificationToken,
      nickname,
      phone,
      email,
      ...(avatarUrl && { avatarUrl })
    })
  } catch (err) {
    Sentry.captureException(err)
  }
}

const registerPushNotificationListener = (store) => {
  const listener = notificationHandler(store)
  Notifications.addListener(listener)
}

const notificationHandler = (store) => (notificationEvent) => {
  const { data: notification } = notificationEvent

  if (!notification || !notification.type) {
    return
  }

  const refreshWalletTypes = ['AVAILABLE_CASH', 'LOAN_REJECTED_INVESTOR']
  if (refreshWalletTypes.includes(notification.type)) {
    store.dispatch(accountOperations.fetchIuguBalance())
  }

  if (notification.type === 'PROFILE_PICTURE_REJECTED') {
    store.dispatch(accountOperations.fetchAccount())
    store.dispatch(noticesOperations.fetchBanner())
  }
  store.dispatch({
    type: 'PUSH_NOTIFICATION',
    notification
  })
}

export { registerPushNotificationToken, registerPushNotificationListener }
