import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default class Row extends PureComponent {
  render () {
    const { children, style, ...props } = this.props
    return (
      <View style={[ styles.row ].concat(style)} {...props}>
        {children}
      </View>
    )
  }
}
