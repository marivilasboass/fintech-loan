import React from 'react'
import { StyleSheet } from 'react-native'

import { View, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Spacing.s6,
    marginHorizontal: Spacing.s6
  }
})

export default class Content extends React.PureComponent {
  render () {
    const { style, ...otherProps } = this.props

    return <View style={[styles.container].concat(style)} {...otherProps} />
  }
}
