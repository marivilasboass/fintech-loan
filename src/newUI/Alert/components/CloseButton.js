import React from 'react'
import { StyleSheet } from 'react-native'

import Icon from '../../Icon'
import Colors from '../../Colors'
import Spacing from '../../Spacing'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: Spacing.s6
  }
})

export default class CloseButton extends React.PureComponent {
  render () {
    const { color, ...props } = this.props

    return (
      <Icon style={styles.container} type='feather' name='x' size={26} color={color || Colors.white} {...props} />
    )
  }
}
