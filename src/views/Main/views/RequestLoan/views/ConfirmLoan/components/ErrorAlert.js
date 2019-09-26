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
          Houve um erro inesperado ao confirmar seu empréstimo. Entre em contato com nossa central de atendimento
        </Alert.Description>

        <Alert.Button bold title='Ok' onPress={onAccept} />
      </Alert>
    )
  }
}
