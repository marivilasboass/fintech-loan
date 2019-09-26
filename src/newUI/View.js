import React from 'react'
import { View, StyleSheet } from 'react-native'
import Spacing from './Spacing'

const styles = StyleSheet.create({
  paddedHorizontally: {
    paddingHorizontal: Spacing.s6
  }
})

export default class extends React.Component {
  render () {
    const { paddedHorizontally, style, ...otherProps } = this.props
    const viewStyle = [paddedHorizontally && styles.paddedHorizontally].concat(style)

    return <View {...otherProps} style={viewStyle} />
  }
}
