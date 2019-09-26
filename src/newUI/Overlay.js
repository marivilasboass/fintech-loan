import React from 'react'
import { StyleSheet } from 'react-native'

import View from './View'
import Colors from './Colors'

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.overlay,
    opacity: 0.8,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    height: '100%',
    width: '100%'
  }
})

export default class Overlay extends React.PureComponent {
  render () {
    const { style, ...props } = this.props
    return (
      <View style={[styles.overlay].concat(style)} {...props} />
    )
  }
}
