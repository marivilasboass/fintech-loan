import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Alert } from '~/newUI'
import moneyArrowsImage from '../images/money-arrows.png'

const styles = StyleSheet.create({
  image: {
    marginBottom: 20
  }
})

export default class HasActiveLoanAlert extends React.PureComponent {
  render () {
    const { onRequestClose, onAccept, ...otherProps } = this.props

    return (
      <Alert {...otherProps}>
        <Alert.CloseButton color={Colors.brightBlue} onPress={onRequestClose} />
        <Alert.Image source={moneyArrowsImage} imageStyle={styles.image} />
        <Alert.Title>
          Você já possui um empréstimo ativo
        </Alert.Title>
        <Alert.Description>
          Não permitimos mais de um empréstimo ativo por vez. Cancele ou quite o seu empréstimo atual antes de solicitar outro.
        </Alert.Description>
        <Alert.Button title='Continuar' onPress={onAccept} />
      </Alert>
    )
  }
}
