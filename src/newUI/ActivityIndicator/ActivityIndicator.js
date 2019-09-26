import React, { PureComponent } from 'react'
import { Animated, Easing } from 'react-native'

import Colors from '../Colors'
import Icon from '../Icon'

export default class ActivityIndicator extends PureComponent {
  static defaultProps = {
    color: Colors.secondary,
    size: 16
  }

  rotation = new Animated.Value(0)

  componentDidMount () {
    this.keepRotating()
  }

  keepRotating () {
    this.rotation.setValue(0)
    Animated.timing(this.rotation, {
      toValue: 1,
      duration: 1080,
      easing: Easing.linear
    }).start(() => this.keepRotating())
  }

  render () {
    const { size, color } = this.props
    const rotate = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <Animated.View style={{ justifyContent: 'center', alignItems: 'center', transform: [{ rotate }] }}>
        <Icon size={size} color={color} type='mutual' name='loading' />
      </Animated.View>
    )
  }
}
