import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Colors from './Colors'

const widthStyleByLength = (length) => {
  const defaultPadding = 24
  const fontSize = 12
  const contentWidth = fontSize * length
  const width = contentWidth + defaultPadding
  return { width, textAlign: 'center' }
}

var styles = StyleSheet.create({
  input: {
    minHeight: 50,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.background,
    color: Colors.light,
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 0,
    marginVertical: 0
  },
  disabled: {
    backgroundColor: Colors.lighter
  }
})

export default class InputKit extends Component {
  focus = () => this.inputRef && this.inputRef.focus()

  render () {
    const { style, type, disabled, exactLength, onExactLength, onChangeText, forwardedRef, ...otherProps } = this.props

    const stylesToPass = [
      styles.input,
      style,
      disabled && styles.disabled
    ]

    if (type) {
      return (
        <TextInputMask
          placeholderTextColor={Colors.placeholder}
          underlineColorAndroid={Colors.underline}
          type={type}
          style={stylesToPass}
          editable={!disabled}
          returnKeyType={this.props.returnKeyType || 'done'}
          onChangeText={onChangeText}
          {...otherProps}
        />
      )
    }

    const autoCapitalize = this.props.keyboardType === 'email-address' ? 'none' : null

    if (exactLength) {
      stylesToPass.push(widthStyleByLength(exactLength))
    }

    return (
      <TextInput
        placeholderTextColor={Colors.placeholder}
        underlineColorAndroid={Colors.underline}
        style={stylesToPass}
        editable={!disabled}
        returnKeyType={this.props.returnKeyType || 'done'}
        autoCapitalize={autoCapitalize}
        maxLength={exactLength}
        {...otherProps}
        onChangeText={text => {
          onExactLength && exactLength === text.length && onExactLength()
          onChangeText && onChangeText(text)
        }}
        ref={ref => { this.inputRef = ref }}
      />
    )
  }
}
