import React, { Component } from 'react'
import { Text as RNText, StyleSheet, Dimensions } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import math from 'mathjs'

import Colors from '../Colors'
import formatText from '~/services/format'
import Placeholder from '../Placeholder'

const { width: DeviceSize } = Dimensions.get('window')

const markdownStyles = StyleSheet.create({
  paragraph: { /* eslint-disable-line react-native/no-unused-styles */
    marginTop: 0,
    marginBottom: 0
  }
})

export default class Text extends Component {
  static defaultProps = {
    variant: 'regular',
    fontSize: 16,
    color: Colors.black,
    align: 'left',
    loaderProps: {}
  }

  render () {
    const { adaptSize, format, variant, fontSize, color, align, style, children, cents, loading, loaderProps, ...props } = this.props

    const textCents = cents ? math.divide(children, 100) : children
    const text = format
      ? formatText(format, textCents)
      : children

    const propStyle = {
      fontFamily: `lato-${variant.toLowerCase()}`,
      fontSize: adaptSize && DeviceSize < 360 ? fontSize - 2 : fontSize,
      color,
      textAlign: align
    }

    if (loading) {
      const placeholderProps = {
        ...loaderProps,
        height: loaderProps.height || fontSize
      }
      return (
        <Placeholder style={[propStyle].concat(style)} {...placeholderProps} />
      )
    }

    return (
      <RNText
        style={[propStyle].concat(style)}
        {...props}
      >
        {text}
      </RNText>
    )
  }
}

// const fontSizes = [12, 14, 16, 20, 24, 28, 32, 36, 42, 44, 56, 64, 72]

Text.T1 = (props) => <Text fontSize={24} {...props} />
Text.T2 = (props) => <Text fontSize={20} {...props} />
Text.T3 = (props) => <Text fontSize={16} {...props} />
Text.T4 = (props) => <Text fontSize={14} {...props} />
Text.T5 = (props) => <Text fontSize={12} {...props} />

Text.H1 = (props) => <Text fontSize={32} variant='heavy' {...props} />
Text.H2 = (props) => <Text fontSize={28} variant='bold' {...props} />
Text.H3 = (props) => <Text fontSize={24} variant='bold' {...props} />
Text.H4 = (props) => <Text fontSize={20} variant='bold' {...props} />
Text.H5 = (props) => <Text fontSize={16} variant='semibold' {...props} />

Text.Markdown = ({ children, ...props }) => {
  const markdownRules = {
    textgroup: (node, children) => <Text key={node.key} {...props}>{children}</Text>,
    strong: (node, children) => <Text key={node.key} {...props} variant='bold'>{children}</Text>
  }

  return <Markdown rules={markdownRules} style={markdownStyles}>{children}</Markdown>
}
