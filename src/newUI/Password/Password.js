import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native'

import Colors from '../Colors'
import View from '../View'
import Spacing from '../Spacing'
import Text from '../Text'
import Shadow from '../Shadow'
import Touch from '../Touch'
import Icon from '../Icon'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  content: {
    width: 300
  },
  digitWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4
  },
  digitOuter: {
  },
  digitInner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  digitLast: {
    marginRight: 0
  },
  digitText: {
    color: Colors.text,
    lineHeight: 40
  },
  digitFocused: {
    borderColor: Colors.focused
  },
  digitError: {
    borderColor: Colors.error
  },
  inputHidden: {
    height: 50,
    position: 'absolute',
    top: -9999,
    left: 0,
    backgroundColor: 'transparent',
    color: 'transparent'
  },
  help: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingRight: 2,
    paddingLeft: 2
  },
  error: {
  },
  toggleButton: {
  },
  toggleText: {
    fontSize: 14,
    color: Colors.disabledGray,
    marginLeft: 1,
    bottom: 2
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.s2
  }
})

export default class PasswordInput extends React.PureComponent {
  state = {
    showPassword: false,
    focused: true
  }

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove()
  }

  keyboardDidHide = () => {
    this.textInput.blur()
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleBlur = () => {
    this.setState({ focused: false })
  }

  handleDigitsPress = () => {
    this.textInput.focus()
  }

  handleChange = (value) => {
    if (value.length >= 6) {
      this.textInput.blur()
    }
    this.props.onChange(value)
  }

  handleToggle = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  render () {
    const { style, value, error, returnKeyType } = this.props
    const { showPassword, focused } = this.state
    const digits = value ? value.split('') : new Array(6)

    return (
      <View style={[styles.container].concat(style)}>
        <View style={styles.content}>
          <TouchableWithoutFeedback onPress={this.handleDigitsPress}>
            <View style={styles.digitWrapper}>
              {[0, 1, 2, 3, 4, 5].map(i => {
                const digit = digits[i] ? this.state.showPassword ? digits[i] : '●' : ''
                const fontSize = this.state.showPassword ? 24 : 30

                return (
                  <Shadow key={`digit_${i}`}
                    radius={6}
                    width={46}
                    height={45}
                    opacity={1}
                    outerStyle={[styles.digitOuter,
                      i === 5 && styles.digitLast]}
                    innerStyle={[
                      styles.digitInner,
                      digit && styles.digitFocused,
                      focused && i === 0 && styles.digitFocused,
                      value && value.length === i && focused ? styles.digitFocused : null,
                      error && styles.digitError
                    ]}>
                    <Text fontSize={fontSize} variant='bold' style={styles.digitText} >{digit}</Text>
                  </Shadow>
                )
              })}
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.help}>
            <Text fontSize={16} color={Colors.error} style={styles.error}>{error || ''}</Text>
            <Touch onPress={this.handleToggle} style={styles.toggleButton}>
              <View style={styles.toggleWrapper}>
                <Icon type='material-community' color={Colors.disabledGray} size={20} name={showPassword ? 'eye-off' : 'eye-outline'} />
                <Text style={styles.toggleText}>{showPassword ? 'Esconder' : ' Mostrar'}</Text>
              </View>
            </Touch>
          </View>
        </View>

        <TextInput
          style={styles.inputHidden}
          keyboardType='numeric'
          maxLength={6}
          caretHidden
          autoFocus
          secureTextEntry
          value={this.props.value}
          returnKeyType={returnKeyType || 'done'}
          underlineColorAndroid='transparent'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={this.handleChange}
          onSubmitEditing={this.props.onSubmit}
          ref={textInput => { this.textInput = textInput }}
        />
      </View>
    )
  }
}
