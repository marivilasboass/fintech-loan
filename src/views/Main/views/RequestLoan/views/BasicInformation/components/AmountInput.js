import React from 'react'
import { View, StyleSheet, Keyboard } from 'react-native'

import { MaskedInput, Text, Touch } from '~/UI'
import { Colors } from '~/newUI'
import format from '~/services/format'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    color: Colors.nightRider,
    marginVertical: 13
  },
  limitsText: {
    color: Colors.warmGray
  },
  labelStyle: {
    fontFamily: 'lato-regular'
  },
  invalidValue: {
    fontFamily: 'lato-bold',
    color: Colors.red
  }
})

export default class AmountInput extends React.Component {
  state = {
    minValue: false
  }

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.blur)
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove()
  }

  onChange = (amount) => {
    if (!amount) {
      this.props.onChange(0)
    }

    const parsedAmount = parseInt(amount, 10)
    this.props.onChange(parsedAmount)
  }

  onBlur = () => {
    this.props.onBlur && this.props.onBlur()
  }

  onFocus = () => {
    this.props.onFocus && this.props.onFocus()
  }

  focus = () => {
    this.inputRef && this.inputRef.focus()
  }

  blur = () => {
    this.inputRef && this.inputRef.blur()
  }

  isFocused = () => this.inputRef && this.inputRef.isFocused()

  formatValue = stringValue => stringValue && stringValue !== '0'
    ? format('currencyRounded', stringValue)
    : 'R$'

  amountToString = amount => !amount
    ? '0'
    : `${amount}`

  render () {
    const { min, amount, validAmount } = this.props

    return (
      <Touch onPress={this.focus}>
        <View style={styles.container}>
          <MaskedInput
            style={styles.input}
            formatValue={this.formatValue}
            currencyStyle={styles.labelStyle}
            value={this.amountToString(amount)}
            keyboardType='numeric'
            maxLength={5}
            underlineColorAndroid='transparent'
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            ref={ref => { this.inputRef = ref }}
            cursorColor={Colors.brightBlue}
            autoFocus
            withCursor
          />
          <View>
            <Text light style={[ styles.limitsText, !validAmount && styles.invalidValue ]} size='xsmall'>
              Valor mínimo&nbsp;
              <Text type='currencyRounded' light size='xsmall' style={[ styles.limitsText, !validAmount && styles.invalidValue ]}>
                {min}
              </Text>
            </Text>
          </View>
        </View>
      </Touch>
    )
  }
}
