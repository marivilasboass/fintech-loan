import { Location, Permissions, IntentLauncherAndroid } from 'expo'
import { Linking, Platform } from 'react-native'
import Sentry from 'sentry-expo'

export const attemptToGetLocation = async () => {
  const locationPermissionGranted = await isLocationPermissionGranted()
  if (!locationPermissionGranted) {
    return null
  }

  const locationServicesEnabled = await isLocationServicesEnabled()
  if (!locationServicesEnabled) {
    return null
  }

  const location = await safelyGetLocation()

  return location
}

export const isLocationPermissionGranted = async () => {
  try {
    const locationPermission = await Permissions.getAsync(Permissions.LOCATION)
    return locationPermission.status === 'granted'
  } catch (err) {
    Sentry.captureException(err)
    return false
  }
}

export const askForLocationPermission = async () => {
  try {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    return status === 'granted'
  } catch (err) {
    Sentry.captureException(err)
    return false
  }
}

export const isLocationServicesEnabled = async () => {
  try {
    const servicesEnabled = await Location.hasServicesEnabledAsync()
    return servicesEnabled
  } catch (err) {
    Sentry.captureException(err)
    return false
  }
}

export const safelyGetLocation = async () => {
  try {
    const location = await getLocation()
    return location
  } catch (err) {
    return null
  }
}

export const getLocation = async () => {
  const timeout = new Promise((resolve, reject) => {
    return setTimeout(() => reject(new Error('Location timeout')), 20 * 1000)
  })

  const locationPromise = Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })

  const location = await Promise.race([locationPromise, timeout])

  return location.coords
}

export const openGeneralLocationSettings = async () => {
  if (Platform.OS === 'ios') {
    await Linking.openURL('App-Prefs:root=Privacy&path=LOCATION')
    return
  }

  await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS)
}

export const openAppLocationSettings = async () => {
  if (Platform.OS === 'ios') {
    await Linking.openURL('app-settings:')
    return
  }

  await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_APPLICATION_SETTINGS)
}
