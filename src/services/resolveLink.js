import Sentry from 'sentry-expo'
import { Linking, Alert } from 'react-native'

export default function resolveLink (navigation, link) {
  var url = link.split('://')
  var protocol = url[0]
  var host = url[1]
  var params = {}

  if (protocol === 'mutualclub') {
    if (host.indexOf('?') > -1) {
      const hostSplit = host.split('?')
      var query = hostSplit[1]
      host = hostSplit[0]

      query.split('&').map(item => {
        var param = item.split('=')
        params[param[0]] = param[1]
      })
    }

    if (host.length > 0) {
      navigation.navigate(host, params)
    }
  }

  if (protocol === 'http' || protocol === 'https') {
    Linking.openURL(link).catch((err) => {
      Alert.alert('Oops! Tivemos um problema em acessar o link')
      Sentry.captureException(err)
    })
  }

  return null
}
