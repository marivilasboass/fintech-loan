import React from 'react'
import { StyleSheet, WebView, View } from 'react-native'
import { Checkbox, Button, Text } from '~/UI'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  confirmContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  confirmText: {
    flex: 1
  }
})

export default class TermsModal extends React.Component {
  state = {
    confirmed: false,
    loaded: false
  }

  onLoadEnd = () => {
    this.setState({ loaded: true })
  }

  onConfirm = (confirmed) => {
    this.setState({ confirmed })
  }

  render () {
    const { onAccept, description, uri } = this.props
    const { loaded, confirmed } = this.state

    const disabled = !loaded || !confirmed

    return (
      <View style={styles.container} {...this.props} >
        <WebView
          source={{ uri }}
          onLoadEnd={this.onLoadEnd}
        />

        <View style={styles.confirmContainer}>
          <Checkbox checked={confirmed} onChange={this.onConfirm} />
          <Text style={styles.confirmText} light size='small'>
            {description}
          </Text>
        </View>

        <Button
          large
          disabled={disabled}
          onPress={onAccept}
        >
          Continuar
        </Button>
      </View>
    )
  }
}
