import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import Colors from '../Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default class Loader extends Component {
  render () {
    const { color, size, style } = this.props

    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator animating color={color || Colors.primary} size={size || 'large'} />
        {this.props.children ? this.props.children : null}
      </View>
    )
  }
}
