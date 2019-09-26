import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Colors, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.s6,
    paddingBottom: Spacing.s6
  },

  blueHeader: {
    backgroundColor: Colors.marineBlue
  }
})

export default class Header extends React.PureComponent {
  render () {
    const { style, blue, ...otherProps } = this.props

    return <View style={[styles.container, blue && styles.blueHeader].concat(style)} {...otherProps} />
  }
}
