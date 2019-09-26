import React from 'react'
import { StyleSheet } from 'react-native'

import View from '../../View'
import Colors from '../../Colors'

const styles = StyleSheet.create({
  dark: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.marineBlue,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 20
  }
})

export default class DarkHeader extends React.PureComponent {
  render () {
    const { style, ...props } = this.props

    return <View {...props} style={[styles.dark].concat(style)} />
  }
}
