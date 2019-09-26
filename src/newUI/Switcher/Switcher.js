import React from 'react'
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native'

import Colors from '../Colors'
import View from '../View'
import Shadow from '../Shadow'

const height = 36
const borderRadius = height / 2

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height
  },
  text: {
    height,
    fontSize: 16,
    fontFamily: 'lato-regular',
    backgroundColor: 'transparent',
    lineHeight: height,
    textAlign: 'center',
    alignItems: 'center',
    bottom: 1,
    zIndex: 50
  },
  textLeft: {
    position: 'absolute',
    left: 0
  },
  textRight: {
    position: 'absolute',
    right: 0
  },
  backgroundSelected: {
    height,
    position: 'absolute',
    borderRadius,
    zIndex: 10
  }
})

export default class Switcher extends React.Component {
  static defaultProps = {
    onChange: () => { throw new Error('Switcher expects onChange function') },
    backgroundColor: Colors.background,
    borderColor: Colors.solitude
  }

  state = {
    width: null
  }

  constructor (props) {
    super(props)
    this.toggleAnimation = new Animated.Value(props.right.value === props.value ? 1 : 0)
  }

  handleToggle = () => {
    const { value, onChange, left, right } = this.props

    Animated.timing(
      this.toggleAnimation,
      {
        duration: (this.state.width - 20) / 2,
        toValue: value === left.value ? 1 : 0
      }
    ).start(() => {
      if (value === left.value) {
        onChange(right)
      } else {
        onChange(left)
      }
    })
  }

  render () {
    const { left, right, selectedColor, backgroundColor, borderColor, hideShadow, shadowColor, ...props } = this.props
    if (!left || !right) {
      throw new Error('Switcher expects left and right values')
    }

    const wrapperStyle = [styles.wrapper, { width: this.state.width }]
    const halfWidthStyle = { width: this.state.width / 2 }

    const leftStyle = [
      styles.text,
      halfWidthStyle,
      styles.textLeft,
      {
        color: this.toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.white, Colors.disabled]
        })
      }
    ]

    const rightStyle = [
      styles.text,
      halfWidthStyle,
      styles.textRight,
      {
        color: this.toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.disabled, Colors.white]
        })
      }
    ]

    const backgroundStyle = [
      styles.backgroundSelected, { backgroundColor: selectedColor || Colors.brightBlue },
      { width: (this.state.width) / 2 },
      {
        left: this.toggleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, (this.state.width) / 2]
        })
      }
    ]

    return (
      <View onLayout={event => this.setState({ width: event.nativeEvent.layout.width })} {...props}>
        { this.state.width && (
          <Shadow innerStyle={{ backgroundColor, borderColor }} color={shadowColor || Colors.lightGray} width={this.state.width} height={height + 2} y={hideShadow ? 0 : 2} radius={borderRadius}>
            <TouchableWithoutFeedback onPress={this.handleToggle}>
              <View style={wrapperStyle}>
                <Animated.View style={backgroundStyle} />
                <Animated.Text style={leftStyle}>{left.label}</Animated.Text>
                <Animated.Text style={rightStyle}>{right.label}</Animated.Text>
              </View>
            </TouchableWithoutFeedback>
          </Shadow>
        )}
      </View>
    )
  }
}
