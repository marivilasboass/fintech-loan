import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Alert, Spacing, View, ActivityIndicator } from '~/newUI'

const styles = StyleSheet.create({
  loading: {
    marginVertical: Spacing.s6
  }
})

export default class UploadingAlert extends React.PureComponent {
  render () {
    const { error, onRetry, onCancel, ...otherProps } = this.props

    if (error) {
      return (
        <Alert onBackdropPress={onCancel} {...otherProps}>
          <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />

          <Alert.Title>Não foi possível enviar seus documentos</Alert.Title>
          <Alert.Description>Verifique sua conexão de internet e tente novamente</Alert.Description>

          <Alert.Button bold title='Tentar novamente' onPress={onRetry} />
        </Alert>
      )
    }

    return (
      <Alert {...otherProps}>
        <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />

        <Alert.Title>Estamos enviando seus documentos</Alert.Title>
        <Alert.Description>Isso pode demorar alguns segundos</Alert.Description>

        <View style={styles.loading}>
          <ActivityIndicator size={44} color={Colors.brightBlue} />
        </View>
      </Alert>
    )
  }
}
