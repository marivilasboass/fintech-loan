import React from 'react'
import { StyleSheet } from 'react-native'
import { View, ActivityIndicator, Colors } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class Loading extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={44} color={Colors.brightBlue} />
      </View>
    )
  }
}
