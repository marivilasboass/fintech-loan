import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as RNEButton } from 'react-native-elements'
import R from 'ramda'
import debounce from 'lodash.debounce'

import Colors from './Colors'

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0
  },
  component: {
    backgroundColor: Colors.primary
  },
  large: {
    padding: 15
  },
  inverted: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  text: {
    fontFamily: 'open-sans-regular',
    textAlign: 'center'
  },
  invertedText: {
    color: Colors.primary
  }
})

export default class Button extends React.PureComponent {
  render () {
    const { style, title, inverted, large, children, onPress, ...otherProps } = this.props

    const isFunction = typeof onPress === 'function'
    const debouncedOnPress = isFunction
      ? debounce(onPress, 1000, { leading: true, trailing: false })
      : R.identity

    const buttonStyle = [
      styles.component,
      inverted && styles.inverted,
      large && styles.large
    ].concat(style)

    const textStyle = [
      styles.text,
      inverted && styles.invertedText
    ]

    return (
      <RNEButton
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        containerViewStyle={styles.container}
        title={title || children}
        onPress={debouncedOnPress}
        large={large}
        {...otherProps}
      />
    )
  }
}
