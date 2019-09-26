import React, { Component } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import Colors from './Colors'
import format from '~/services/format'

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  base: {
    fontFamily: 'open-sans-regular',
    backgroundColor: 'transparent',
    // TODO: improve color names
    color: Colors.black,
    fontSize: 16
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
  // Sizes
  xsmall: {
    fontSize: 12
  },
  small: {
    fontSize: 14
  },
  large: {
    fontSize: 18
  },
  xlarge: {
    fontSize: 20
  },
  // Highlights
  bold: {
    fontFamily: 'open-sans-bold'
  },
  light: {
    fontFamily: 'open-sans-light'
  },
  // Positioning
  centered: {
    textAlign: 'center'
  }
})

const markdownStyles = StyleSheet.create({
  paragraph: { /* eslint-disable-line react-native/no-unused-styles */
    marginTop: 0,
    marginBottom: 0
  }
})

export default class Text extends Component {
  render () {
    const { markdown, type, children, ...someProps } = this.props

    const text = type
      ? format(type, children)
      : children

    if (markdown) {
      const markdownRules = {
        textgroup: (node, children, parent, styles) => <Text key={node.key} {...someProps}>{children}</Text>,
        strong: (node, children, parent, styles) => <Text key={node.key} bold {...someProps}>{children}</Text>
      }

      return <Markdown rules={markdownRules} style={markdownStyles}>{text}</Markdown>
    }

    const {
      style,
      size,
      primary, secondary, white,
      bold, light,
      centered,
      ...otherProps
    } = someProps

    const passedStyle = [
      styles.base,
      primary && styles.primary,
      secondary && styles.secondary,
      white && styles.white,
      size && styles[size],
      light && styles.light,
      bold && styles.bold,
      centered && styles.centered
    ].concat(style)

    return (
      <RNText
        style={passedStyle}
        {...otherProps}
      >
        {text}
      </RNText>
    )
  }
}
