import React, { Component } from 'react'
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import * as R from 'ramda'
import View from '../View'
import Spacing from '../Spacing'
import Colors from '../Colors'

const styles = StyleSheet.create({
  pullContainer: {
    paddingBottom: Spacing.s3,
    paddingTop: Spacing.s6
  },

  pullElement: {
    width: 133,
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.rgbaWhiteOpacity('0.65'),
    zIndex: 2,
    position: 'relative',
    alignSelf: 'center'
  }
})

export default class BottomSheet extends Component {
  static defaultProps = {
    height: Dimensions.get('window').height
  }
  state = {
    visible: this.props.visible
  }

  componentWillMount () {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0)
    this._panResponder = this.createPanResponderObject()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.setState({ visible: nextProps.visible })
    })
    this.scrollY = new Animated.Value(this.props.visible ? 1 : 0)

    if (nextProps.visibleHeight || nextProps.visibleHeight === 0) {
      Animated.timing(this.scrollY, {
        toValue: -nextProps.visibleHeight,
        duration: nextProps.duration,
        useNativeDriver: true
      }).start()
    }
  }

  createPanResponderObject = () => PanResponder.create({
    onMoveShouldSetResponderCapture: R.T,
    onMoveShouldSetPanResponderCapture: R.F,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dy } = gestureState
      return dy > 5 || dy < -5
    },
    onPanResponderMove: (event, gestureState) => {
      const { dy } = gestureState
      if (dy > 0) {
        return Animated.event([null, { dy: this.scrollY }])(event, gestureState)
      }
    },
    onPanResponderRelease: (event, { vy, dy, moveY }) => {
      if ((Math.abs(vy) >= 0.2 || Math.abs(dy) >= 0.2 * this.props.height) && dy > 0) {
        Animated.sequence([
          Animated.timing(this.scrollY, {
            toValue: this.props.height,
            duration: 300,
            useNativeDriver: true
          }).start(() => {
            this.setState(prevState => ({ visible: !prevState.visible }))
            this.props.onClose()
          }),
          Animated.timing(this._visibility, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }).start()
        ])
      } else {
        Animated.spring(this.scrollY, {
          toValue: 0,
          bounciness: 10,
          useNativeDriver: true
        }).start()
      }
    }
  })

  getComponent = key => this.props.children.filter(component => component.key === key)

  render () {
    const { style, children, height, ...rest } = this.props
    const { visible } = this.state

    const containerStyleSlide = {
      transform: [{ translateY: this.scrollY }]
    }

    const containerStyleSlideStart = {
      transform: [{
        translateY: this._visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0]
        })
      }]
    }

    const containerStyleFade = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [{
        scale: this._visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1]
        })
      }]
    }

    const combinedStyleFade = [containerStyleFade, style]

    if (rest.pullControl) {
      return (
        <Animated.View style={visible ? combinedStyleFade : containerStyleFade} {...rest}>
          {visible ? this.getComponent('fade') : null}
          <Animated.View style={containerStyleSlideStart}>
            { visible && (
              <Animated.View style={containerStyleSlide}>
                {rest.pullControl && (
                  <Animated.View {...this._panResponder.panHandlers}>
                    <TouchableWithoutFeedback onPress={rest.onClose}>
                      <View style={styles.pullContainer}>
                        <View style={styles.pullElement} />
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>
                )}
                { this.getComponent('slide') }
              </Animated.View>
            )}
          </Animated.View>
        </Animated.View>
      )
    }

    return (
      <Animated.View style={visible ? combinedStyleFade : containerStyleFade} {...rest}>
        {visible ? this.getComponent('fade') : null}
        <Animated.View style={containerStyleSlideStart} {...this._panResponder.panHandlers}>
          { visible && (
            <Animated.View style={containerStyleSlide}>
              { this.getComponent('slide') }
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    )
  }
}
