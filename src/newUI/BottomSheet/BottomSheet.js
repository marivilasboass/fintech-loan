import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Platform, Keyboard, StatusBar, BackHandler } from 'react-native'
import Colors from '../Colors'
import * as Animations from '../Animations'
import BottomSheetButton from './components/BottomSheetButton'
import Spacing from '../Spacing'
import { isIphoneX } from '~/utils/iosHelper'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.stage,
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: 9999999
  },

  sheet: {
    maxHeight: Dimensions.get('window').height - Spacing.s15,
    backgroundColor: Colors.white
  }
})

export default class BottomSheet extends PureComponent {
  state = {
    touchableHeight: this.props.handleIphoneX && isIphoneX() ? 200 : 0,
    normalTouchableHeight: 0,
    offset: 0,
    layoutHeight: 0,
    screenHeight: Dimensions.get('window').height || this.props.screenHeight
  }

  componentDidUpdate () {
    if (this.props.active) {
      BackHandler.addEventListener('hardwareBackPress', this.backHandler)
      return
    }
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  backHandler = () => {
    this.props.onPress()
    return true
  }

  keyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height
    const duration = event.duration
    const state = {
      duration: duration || keyboardHeight // android nao tem duration
    }
    state.touchableHeight = this.state.screenHeight - keyboardHeight - this.state.layoutHeight
    if (Platform.OS === 'android') {
      state.touchableHeight -= StatusBar.currentHeight
    }
    this.setState(state)
  }

  keyboardDidHide = (event) => {
    const touchableHeight = this.state.normalTouchableHeight
    this.setState({ touchableHeight })
  }

  calculateTouchableHeight = (layout) => {
    const { height } = layout
    const screenHeight = this.state.screenHeight
    const pullComponentHeight = 38
    const layoutHeight = height + pullComponentHeight
    let touchableHeight = screenHeight - layoutHeight
    if (Platform.OS !== 'ios') {
      touchableHeight -= StatusBar.currentHeight
    }
    touchableHeight = touchableHeight < 0 ? 0 : touchableHeight
    this.setState({
      touchableHeight,
      normalTouchableHeight: touchableHeight,
      layoutHeight
    })
  }

  render () {
    const { active, onPress, children } = this.props
    const { visibleHeight, touchableHeight, duration } = this.state
    return (
      <Animations.BottomSheet pullControl visible={active} style={styles.wrapper} onClose={onPress} visibleHeight={visibleHeight} duration={duration}>
        <TouchableWithoutFeedback onPress={onPress} key='fade'>
          <View style={{ height: touchableHeight }} />
        </TouchableWithoutFeedback>
        <View onLayout={(event) => this.calculateTouchableHeight(event.nativeEvent.layout)} key='slide'>
          <View style={[styles.sheet]}>
            {children}
          </View>
        </View>
      </Animations.BottomSheet>
    )
  }
}

BottomSheet.Button = BottomSheetButton
