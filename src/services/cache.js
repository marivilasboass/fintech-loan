import { FileSystem } from 'expo'
import md5 from 'md5'
import Sentry from 'sentry-expo'

const { cacheDirectory } = FileSystem

// save image locally using an md5 hash based on the url (that has userid + timestamp)
const getLocalImageURI = (URLPath) => `${cacheDirectory}${md5(URLPath)}.jpg`

export const asyncGetCachedImageURI = async (URLPath) => {
  const localURI = getLocalImageURI(URLPath)

  try {
    const { exists } = await FileSystem.getInfoAsync(localURI)

    if (!exists) {
      await FileSystem.downloadAsync(URLPath, localURI)
    }

    return localURI
  } catch (err) {
    Sentry.captureException(err)
    return null
  }
}

export const eagerlyGetCachedImageURI = (URLPath) => {
  asyncGetCachedImageURI(URLPath)

  return getLocalImageURI(URLPath)
}
