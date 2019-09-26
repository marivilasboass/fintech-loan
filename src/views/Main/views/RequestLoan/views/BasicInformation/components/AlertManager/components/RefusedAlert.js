import React from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Colors, Alert, Text } from '~/newUI'
import optionsSignImage from '../../../../../images/options-sign.png'
import partners from '~/constants/partners'

const styles = StyleSheet.create({
  image: {
    marginBottom: 20
  }
})

export default class RefusedAlert extends React.PureComponent {
  onAccept = () => {
    Linking.openURL(partners.simplic)
  }

  render () {
    const { onRequestClose, ...otherProps } = this.props

    return (
      <Alert {...otherProps}>
        <Alert.CloseButton color={Colors.brightBlue} onPress={onRequestClose} />
        <Alert.Image source={optionsSignImage} imageStyle={styles.image} />
        <Alert.Title>
          Infelizmente não conseguimos aprovar seu limite
        </Alert.Title>
        <Alert.Description>
          Isso pode mudar em alguns meses. Enquanto isso, alguns dos nossos parceiros
          <Text.T3 variant='bold'>&nbsp;podem te ajudar!</Text.T3> ;)
        </Alert.Description>
        <Alert.Button title='Consultar parceiros' onPress={this.onAccept} />
      </Alert>
    )
  }
}
