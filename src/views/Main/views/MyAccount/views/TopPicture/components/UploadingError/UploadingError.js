import React from 'react'
import { Colors, Alert } from '~/newUI'

export default class UploadingError extends React.PureComponent {
  render () {
    const { retryUpload, resetUpload, onCancel, ...otherProps } = this.props
    return (
      <Alert onBackdropPress={onCancel} {...otherProps}>
        <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />

        <Alert.Title>Não foi possível carregar sua foto</Alert.Title>
        <Alert.Description>Verifique sua conexão de internet e tente novamente</Alert.Description>

        <Alert.Button bold title='Tentar novamente' onPress={retryUpload} />
        <Alert.Button bold title='Selecionar uma nova foto' onPress={resetUpload} />

      </Alert>
    )
  }
}
