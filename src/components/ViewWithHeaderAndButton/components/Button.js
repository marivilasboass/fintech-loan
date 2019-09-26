import React from 'react'
import { StyleSheet } from 'react-native'

import { Button as UIButton, Spacing } from '~/newUI'

const styles = StyleSheet.create({
  keyboardClosed: {
    marginHorizontal: Spacing.s6,
    marginVertical: Spacing.s6
  },
  keyboardOpen: {
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  hidden: {
    height: 0
  }
})

export default class Button extends React.PureComponent {
  render () {
    const { style, keyboardOpen, fullButton, hideWhenKeyboardOpen, disabled, ...otherProps } = this.props

    const hidden = keyboardOpen && hideWhenKeyboardOpen
    const stylesToPass = [
      !disabled,
      keyboardOpen || fullButton ? styles.keyboardOpen : styles.keyboardClosed,
      hidden && styles.hidden
    ]

    return <UIButton disabled={disabled} style={stylesToPass.concat(style)} {...otherProps} />
  }
}
