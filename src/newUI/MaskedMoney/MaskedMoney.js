import React from 'react'
import { TextInput, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native'
import format from '~/services/format'
import View from '../View'
import Colors from '../Colors'
import Text from '../Text'

const styles = StyleSheet.create({
  // with display none its not possible to clear values
  textInput: {
    position: 'absolute',
    top: -400
  },
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currencyType: {
    fontSize: 28,
    color: Colors.warmGray
  },
  money: {
    fontSize: 28,
    color: Colors.nightRider
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: 'transparent'
  },
  cursor: {
    borderRightColor: Colors.brightBlue
  }

})

export default class MaskedMoney extends React.PureComponent {
  state = {
    cursorVisible: false
  }

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)

    if (this.props.autoFocus) {
      setTimeout(this.handleFocus, 500)
    }
    if (this.props.fastFocus) {
      this.handleFocus()
    }
  }

  componentWillUnmount () {
    clearInterval(this.showCursorInterval)
    this.keyboardDidHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  inputRef = React.createRef()

  toggleCursor = (visibility) => this.setState({
    cursorVisible: typeof visibility !== 'undefined' ? visibility : !this.state.cursorVisible
  })

  keyboardDidHide = () => {
    this.inputRef.current.blur()
    clearInterval(this.showCursorInterval)
    this.toggleCursor(false)
  }

  keyboardDidShow = () => {
    this.toggleCursor(true)
    this.showCursorInterval = setInterval(
      this.toggleCursor, 500
    )
  }

  formatValue = (value) => format('newCurrency', value)

  handleOnChange = (text) => {
    const { onChange } = this.props
    return onChange(this.formatValue(text))
  }

  handleFocus = () => {
    this.inputRef && this.inputRef.current && this.inputRef.current.focus()
  }

  render () {
    const { value, style, returnKeyType, maxLength } = this.props
    const stringValue = String(value)
    return (
      <TouchableWithoutFeedback onPress={this.handleFocus}>
        <View style={[style].concat(styles.container)}>
          <Text variant='light' style={styles.currencyType}>R$ </Text>
          <Text variant='heavy' style={styles.money}>{this.formatValue(stringValue)}</Text>
          <View style={[styles.border, this.state.cursorVisible && styles.cursor]} />

          <TextInput
            maxLength={maxLength}
            style={styles.textInput}
            onChangeText={this.handleOnChange}
            ref={this.inputRef}
            returnKeyType={returnKeyType || 'done'}
            keyboardType='numeric'
            value={stringValue}
            defaultValue={this.formatValue(stringValue)}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
