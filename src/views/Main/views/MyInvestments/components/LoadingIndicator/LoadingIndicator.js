import React from 'react'
import { StyleSheet } from 'react-native'

import { View, ActivityIndicator, Colors } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class LoadingIndicator extends React.PureComponent {
  render () {
    const { active } = this.props
    if (!active) {
      return null
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size={32} color={Colors.mutualPink} />
      </View>
    )
  }
}
