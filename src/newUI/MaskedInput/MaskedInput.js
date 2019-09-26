import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, TextInput, View, Keyboard } from 'react-native'

import Row from '../Row'
import Colors from '../Colors'

const styles = StyleSheet.create({
  textInput: {
    position: 'absolute',
    top: -400
  },

  row: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  borderTransparent: {
    borderRightWidth: 1,
    borderLeftColor: 'transparent'
  },

  cursor: {
    borderRightColor: Colors.brightBlue,
    height: 25,
    top: 1.5
  }
})

export default class MaskedInput extends React.PureComponent {
  state = {
    showCursor: false
  }

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    if (this.props.withCursor) {
      this.intervalId = setInterval(() => this.setState(prevState => ({ showCursor: !prevState.showCursor })), 500)
    }
  }

  componentWillUnmount = () => {
    this.intervalId && clearInterval(this.intervalId)
    this.keyboardDidHideListener.remove()
  }

  keyboardDidHide = () => {
    this.inputRef && this.inputRef.blur()
  }

  handleFocus = () => {
    this.inputRef && this.inputRef.focus()
  }

  render () {
    const { onChange, children, value, style, ...otherProps } = this.props
    const stringValue = `${value}`
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.handleFocus}>
          <Row style={[styles.row].concat(style)}>
            { children }
            <View style={[this.state.showCursor && styles.cursor, styles.borderTransparent]} />
          </Row>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.textInput}
          value={stringValue}
          ref={textInput => { this.inputRef = textInput }}
          returnKeyType='done'
          onChangeText={onChange}
          {...otherProps}
        />
      </React.Fragment>
    )
  }
}
