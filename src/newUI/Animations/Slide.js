import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'

export default class Slide extends Component {
  static defaultProps = {
    height: Dimensions.get('window').height
  }
  state = {
    visible: this.props.visible
  }

  componentWillMount () {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 400
    }).start(() => {
      this.setState({ visible: nextProps.visible })
    })
  }

  render () {
    const { visible, style, children, height, ...rest } = this.props

    const containerStyle = {
      transform: [{
        translateY: this._visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0]
        })
      }]
    }

    const combinedStyle = [containerStyle, style]
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    )
  }
}
