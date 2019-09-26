import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors, Alert, Spacing, Text, View } from '~/newUI'
import UploadWarningIcon from './UploadWarningIcon'

const styles = StyleSheet.create({
  title: {
    marginTop: Spacing.s6,
    marginBottom: Spacing.s1,
    marginHorizontal: 0
  },
  button: {
    backgroundColor: Colors.primary,
    borderWidth: 0
  },
  icon: {
    alignItems: 'center'
  }
})

export default class UploadingWarning extends React.PureComponent {
  render () {
    const { openGalery, onCancel, ...otherProps } = this.props
    return (
      <Alert onBackdropPress={onCancel} {...otherProps}>
        <Alert.CloseButton color={Colors.secondary} onPress={onCancel} />
        <View style={styles.icon}>
          <UploadWarningIcon />
        </View>
        <Alert.Title style={styles.title}>Siga nossa política de imagem e preserve sua conta</Alert.Title>
        <Alert.Description>Você precisa estar sozinho na foto, não use fotos de terceiros ou imagens de cunho político, caso contrário <Text variant={'bold'}>sua conta será banida</Text></Alert.Description>
        <Alert.Button style={styles.button} textStyle={{ color: Colors.white }} bold title='Abrir Galeria' onPress={openGalery} />
      </Alert>
    )
  }
}
