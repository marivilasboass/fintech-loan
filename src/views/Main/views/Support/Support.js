import React from 'react'
import { WebView, StyleSheet } from 'react-native'
import { View } from '~/newUI'
import DefaultHeader from '~/components/Headers/DefaultHeader'

import Loading from './components/Loading'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const uri = 'https://mutual.zendesk.com/hc/pt-br'

const javascriptToInject = `(
  function removeUnneededElements() {
    document.querySelector('header.header').remove();
    document.querySelector('footer.footer').remove();
  }
)();`

export default class Support extends React.PureComponent {
  render () {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <DefaultHeader
          onBack={() => navigation.goBack(null)}
          centerComponent={{ text: 'Ajuda' }}
        />
        <WebView
          injectedJavaScript={javascriptToInject}
          javaScriptEnabled
          startInLoadingState
          renderLoading={() => <Loading />}
          source={{ uri }}
        />
      </View>
    )
  }
}
