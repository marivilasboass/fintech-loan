import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '~/UI/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5
  }
})

export default class RoundedBox extends React.Component {
  render () {
    const { style, ...otherProps } = this.props
    const passedStyle = [styles.container].concat(style)

    return <View style={passedStyle} {...otherProps} />
  }
}
