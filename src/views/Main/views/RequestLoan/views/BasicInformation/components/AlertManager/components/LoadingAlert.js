import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Alert, Spacing, View, ActivityIndicator } from '~/newUI'

const styles = StyleSheet.create({
  loading: {
    marginVertical: Spacing.s6
  }
})

export default class LoadingAlert extends React.PureComponent {
  render () {
    return (
      <Alert {...this.props}>
        <Alert.Title>Estamos analisando seu pedido</Alert.Title>
        <View style={styles.loading}>
          <ActivityIndicator size={44} color={Colors.brightBlue} />
        </View>
      </Alert>
    )
  }
}
