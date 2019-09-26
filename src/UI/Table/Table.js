import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../Colors'

const styles = StyleSheet.create({
  component: {
    borderColor: Colors.border,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.white,
    padding: 10
  }
})

export default class Table extends React.Component {
  render () {
    const { style, ...otherProps } = this.props

    return (
      <View style={[styles.component, style]} {...otherProps} />
    )
  }
}
