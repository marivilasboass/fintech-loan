import React from 'react'
import { Alert, Colors } from '~/newUI'

export default class ErrorAlert extends React.PureComponent {
  render () {
    const { onAccept, onRequestClose, ...otherProps } = this.props

    return (
      <Alert onBackdropPress={onRequestClose} {...otherProps}>
        <Alert.CloseButton color={Colors.secondary} onPress={onRequestClose} />

        <Alert.Title>
          Oops
        </Alert.Title>

        <Alert.Description>
          O nosso sistema de simulação de empréstimo se encontra fora do ar, tente novamente em algumas horas.
        </Alert.Description>

        <Alert.Button bold title='Ok' onPress={onAccept} />
      </Alert>
    )
  }
}
