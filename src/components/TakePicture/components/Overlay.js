import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Text, Colors } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  overlay: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 120,
    marginTop: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultOverlay: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 6,
    paddingBottom: 10,
    justifyContent: 'flex-end'
  }
})

export default class Overlay extends React.Component {
  render () {
    const { message, image } = this.props

    return (
      <View style={styles.container}>
        <View style={[styles.overlay, !image && styles.defaultOverlay]}>
          {
            image ||
            (message && <Text.T5 color={Colors.white}>{message}</Text.T5>)
          }
        </View>
      </View>
    )
  }
}
