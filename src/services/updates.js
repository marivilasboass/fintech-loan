import { Updates } from 'expo'
import { Alert } from 'react-native'
import Sentry from 'sentry-expo'

let isCheckingUpdate = false
export const downloadUpdateIfAvailable = async () => {
  if (isCheckingUpdate || __DEV__) {
    return
  }

  isCheckingUpdate = true
  try {
    const { isAvailable } = await Updates.checkForUpdateAsync()

    if (isAvailable) {
      await Updates.fetchUpdateAsync()
      Alert.alert(
        'Atualização',
        'Uma nova versão do aplicativo foi lançada e precisamos reiniciar para atualizar',
        [{ text: 'OK', onPress: () => Updates.reloadFromCache() }],
        { cancelable: false }
      )
    }
  } catch (err) {
    Sentry.captureException(err)
  }
  isCheckingUpdate = false
}
