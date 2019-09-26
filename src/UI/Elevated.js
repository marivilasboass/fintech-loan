import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

/* eslint-disable react-native/no-unused-styles */

const styles = StyleSheet.create({
  elevation2: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 2
      },
      android: {
        elevation: 2
      }
    })
  },
  elevation4: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 1,
        shadowRadius: 4
      },
      android: {
        elevation: 4
      }
    })
  }
})

export default class Elevated extends React.Component {
  render () {
    const { elevation, style, ...other } = this.props

    const passedStyle = [
      styles[`elevation${elevation}`]
    ].concat(style)

    return <View style={passedStyle} {...other} />
  }
}
