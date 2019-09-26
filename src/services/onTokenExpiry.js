import { Alert } from 'react-native'
import { Util } from 'expo'
import { persistor } from './persistor'

export const onTokenExpiry = () => {
  Alert.alert('Oops!', 'Sua sessão expirou. Você precisa entrar novamente.',
    [{
      text: 'OK',
      onPress: async () => {
        if (persistor) {
          await persistor.purge()
        }

        Util.reload()
      }
    }],
    { cancelable: false }
  )
}
