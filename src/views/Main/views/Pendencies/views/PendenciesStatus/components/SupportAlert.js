import React from 'react'

import { StyleSheet } from 'react-native'
import { Alert, Colors } from '~/newUI'

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white
  }
})

export default class SupportAlert extends React.PureComponent {
  render () {
    const { onChange, onCancel, onAccept, onRetry, value, status, ...otherProps } = this.props

    const loading = status === 'loading'
    const error = status === 'error'
    const success = status === 'success'

    if (success) {
      return (
        <Alert onBackdropPress={onCancel} {...otherProps}>
          <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />

          <Alert.Title>
            Mensagem enviada
          </Alert.Title>

          <Alert.Description>
            Obrigado por entrar em contato. Responderemos sua dúvida em breve.
          </Alert.Description>
        </Alert>
      )
    }

    if (error) {
      return (
        <Alert onBackdropPress={onCancel} {...otherProps}>
          <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />

          <Alert.Title>
            Seu envio falhou...
          </Alert.Title>

          <Alert.Description>
            Sua mensagem está salva e você pode tentar enviar novamente.
          </Alert.Description>

          <Alert.Button bold title='Tentar novamente' onPress={onRetry} />
        </Alert>
      )
    }

    return (
      <Alert onBackdropPress={onCancel} {...otherProps}>
        <Alert.Title>
          Precisa de ajuda?
        </Alert.Title>

        <Alert.Description>
          Digite sua dúvida e responderemos por email
        </Alert.Description>

        <Alert.Input value={value} onChange={onChange} />

        <Alert.Button style={styles.button} disabled={loading} title='Cancelar' onPress={onCancel} />
        <Alert.Button style={styles.button} loading={loading} bold title='Enviar' onPress={onAccept} />
      </Alert>
    )
  }
}
