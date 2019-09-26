import React from 'react'
import { View, StyleSheet, LayoutAnimation } from 'react-native'

import Button from '../Button'
import Colors from '../Colors'
import KeyboardAwareScrollView from '../KeyboardAwareScrollView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default class ViewWithButton extends React.PureComponent {
  state = {
    keyboardOpen: false
  }

  onKeyboardWillShow = (event) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: event.duration
    })

    this.setState({ keyboardOpen: true, keyboardHeight: event.endCoordinates.height })
  }

  onKeyboardWillHide = (event) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: event.duration
    })

    this.setState({ keyboardOpen: false })
  }

  render () {
    const { onPress, buttonText, buttonIcon, buttonRightIcon, buttonStyle, style, loading, disabled, ...otherProps } = this.props
    const { keyboardOpen, keyboardHeight } = this.state

    const absoluteButtonStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: keyboardHeight
    }

    const passedButtonStyle = [
      keyboardOpen && absoluteButtonStyle,
      buttonStyle
    ]

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          onKeyboardWillShow={this.onKeyboardWillShow}
          onKeyboardWillHide={this.onKeyboardWillHide}
          contentContainerStyle={style}
          extraScrollHeight={40}
          {...otherProps}
        />

        <Button
          onPress={onPress}
          style={passedButtonStyle}
          loading={loading}
          disabled={disabled || loading}
          icon={buttonIcon}
          rightIcon={buttonRightIcon}
        >
          {buttonText}
        </Button>
      </View>
    )
  }
}
