import React, { Component } from 'react'
// TODO use our ~/UI/Text instead of RN Text
import { Text, StyleSheet } from 'react-native'

import Colors from './Colors'
import format from '~/services/format'

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  base: {
    fontFamily: 'open-sans-regular',
    // TODO: improve color names
    color: Colors.black,
    fontSize: 30,
    textAlign: 'center'
  },
  // Sizes
  small: {
    fontSize: 26
  },
  large: {
    fontSize: 40
  },
  xlarge: {
    fontSize: 50
  },
  // Colors
  secondary: {
    color: Colors.light
  },
  primary: {
    color: Colors.primary
  },
  white: {
    color: Colors.white
  },
  // Highlights
  bold: {
    fontFamily: 'open-sans-bold'
  },
  light: {
    fontFamily: 'open-sans-light'
  }
})

export default class Title extends Component {
  render () {
    const {
      style, size,
      primary, secondary, white,
      light, bold,
      type,
      children, ...otherProps
    } = this.props

    const text = type
      ? format(type, children)
      : children

    const passedStyle = [
      styles.base,
      primary && styles.primary,
      secondary && styles.secondary,
      white && styles.white,
      size && styles[size],
      light && styles.light,
      bold && styles.bold,
      style
    ]

    return (
      <Text
        style={passedStyle}
        {...otherProps}
      >
        {text}
      </Text>
    )
  }
}
