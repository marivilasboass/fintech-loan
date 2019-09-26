import React from 'react'
import { StyleSheet } from 'react-native'

import Spacing from '../Spacing'
import Touch from '../Touch'
import View from '../View'

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    width: Spacing.s6 * 3,
    height: Spacing.s6 * 3,
    alignItems: 'center',
    paddingLeft: Spacing.s6
  },

  rightIcon: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: Spacing.s6
  }
})

export default class HeaderButton extends React.PureComponent {
  render () {
    const { children, right, onPress, style, ...props } = this.props

    return (
      <Touch onPress={onPress}>
        <View style={[styles.iconContainer, right && styles.rightIcon].concat(style)} {...props}>
          {children}
        </View>
      </Touch>
    )
  }
}
