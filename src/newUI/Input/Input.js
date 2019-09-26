import React from 'react'
import { StyleSheet, View, TextInput, Animated, Easing, Platform } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import Icon from '../Icon'
import Colors from '../Colors'
import Text from '../Text'
import ActivityIndicator from '../ActivityIndicator'

import SuccessAccessory from './components/SuccessAccessory'
import ErrorAccessory from './components/ErrorAccessory'
import Spacing from '../Spacing'

const widthStyleByLength = (length) => {
  const fontSize = 10
  const contentWidth = fontSize * length
  const width = contentWidth
  return { width }
}

const getMaskOptions = (mask) => {
  if (!mask) {
    return {}
  }
  return typeof mask === 'string' ? { type: mask } : { type: 'custom', options: mask }
}

const labelTop = 18

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: Colors.background
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.warmGray
  },
  input: {
    flex: 1,
    fontFamily: 'lato-regular',
    fontSize: 16,
    paddingStart: 1,
    paddingBottom: Platform.select({
      ios: 2,
      default: 0
    }),
    color: Colors.text,
    backgroundColor: 'transparent'
  },
  accessoryContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    position: 'absolute',
    top: labelTop,
    left: 0,
    color: Colors.warmGray
  },
  errorText: {
    fontFamily: 'lato-regular',
    fontSize: 13,
    color: Colors.error
  },
  error: {
    color: Colors.error
  },
  errorInputContainer: {
    borderBottomColor: Colors.error
  },
  focused: {
    color: Colors.focused
  },
  focusedInputContainer: {
    borderBottomColor: Colors.focused
  },
  disabled: {
    backgroundColor: Colors.disabled
  },
  helpContainer: {
    height: 32
  },
  noFocusedStyle: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  }
})

export default class Input extends React.Component {
  static defaultProps = {
    defaultValue: '',
    visible: true
  }

  constructor (props) {
    super(props)
    const { value, onChange, defaultValue } = this.props

    if (defaultValue && value) {
      throw new Error('Component Input não pode ter defaultValue e value')
    } else if (value && !onChange) {
      throw new Error('Component Input não pode ter value sem onChange')
    }

    this.isControlled = !defaultValue

    if (defaultValue) {
      this.labelAnimation = new Animated.Value(1)
      this.state = { focused: false, value: defaultValue }
    } else {
      this.state = { focused: false }
      this.labelAnimation = new Animated.Value(0)
    }
  }

  animateLabel = (from, to) => {
    this.labelAnimation.setValue(from)
    Animated.timing(
      this.labelAnimation,
      {
        toValue: to,
        duration: 225,
        easing: Easing.linear
      }
    ).start()
  }

  handleChange = (value) => {
    if (this.isControlled) {
      this.props.onExactLength && this.props.exactLength === value.length && this.props.onExactLength()
      this.props.onChange(value)
    } else {
      this.setState({ value })
    }

    if (this.props.mask === 'money') {
      this.props.onChange(value, this.input.getRawValue())
    }
  }

  handleFocus = (ev) => {
    this.setState({ focused: true }, () => {
      const value = this.props.value || this.state.value
      if (!value && !this.props.placeholder) {
        this.animateLabel(0, 1)
      }
    })

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(ev)
    }
  }

  handleBlur = (ev) => {
    const value = this.props.value || this.state.value

    this.setState({ focused: false }, () => {
      if (!value && !this.props.placeholder) {
        this.animateLabel(1, 0)
      }
    })

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(ev)
    }
  }

  setRef = (ref) => {
    this.input = ref
  }

  focus = () => {
    /*
      a ref do input por algum motivo nao contem a funções do element input
      por isso foi usado o _inputElement que contem todas as funções do input
    */
    if (this.input.focus) {
      this.input.focus()
    }
    if (this.input._inputElement) {
      this.input._inputElement.focus()
    }
  }

  clear = () => {
    this.input.clear()
  }

  render () {
    const { label, leftIcon, disabled, withoutHelp, mask, error, exactLength, visible, inputStyle, placeholder,
      labelStyle, style, maxLength, loading, success, noFocusedStyle, longErrorText, width, ...otherProps } = this.props
    const { focused } = this.state

    const value = this.props.value || this.state.value

    const inputStyles = [
      styles.input,
      inputStyle
    ]

    const labelStyles = [
      styles.label,
      labelStyle,
      disabled && styles.disabled,
      focused && styles.focused,
      error && styles.error
    ]

    if (placeholder && !value) {
      labelStyles.push({
        top: 0,
        fontSize: 12
      })
    } else if (value) {
      labelStyles.push({
        top: 0,
        fontSize: 12
      })
    } else {
      labelStyles.push({
        fontSize: this.labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 12]
        }),
        top: this.labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [labelTop, 0]
        })
      })
    }

    const inputContainerStyles = [
      styles.inputContainer,
      focused && styles.focusedInputContainer,
      error && styles.errorInputContainer,
      noFocusedStyle && styles.noFocusedStyle
    ]

    const containerStyles = [
      styles.container,
      !visible && { display: 'none' },
      style,
      exactLength && widthStyleByLength(exactLength)
    ]

    const leftIconColor = leftIcon && leftIcon.color ? leftIcon.color : Colors.text

    const iconLeftProps = {
      ...leftIcon,
      fontSize: 14,
      style: {
        marginRight: Spacing.s1
      },
      color: focused ? Colors.focused : leftIconColor,
      alignSelf: 'center'
    }

    const InputCompontent = mask ? TextInputMask : TextInput

    const hasAccessory = loading || error || success

    const isLongText = longErrorText ? { width } : styles.helpContainer

    return (
      <View style={containerStyles}>
        {label && <Animated.Text style={labelStyles}>{label}</Animated.Text>}

        <View style={inputContainerStyles}>
          {leftIcon && <Icon {...iconLeftProps} />}

          <InputCompontent
            style={inputStyles}
            underlineColorAndroid='transparent'
            selectionColor={Colors.focused}
            {...otherProps}
            {...getMaskOptions(mask)}
            ref={this.setRef}
            placeholder={placeholder}
            returnKeyType={this.props.returnKeyType || 'done'}
            maxLength={exactLength || maxLength}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={() => {}}
            onChangeText={this.handleChange}
          />

          {hasAccessory && (
            <View style={styles.accessoryContainer}>
              {loading ? (
                <ActivityIndicator color={Colors.focused} />
              ) : error ? (
                <ErrorAccessory />
              ) : success ? (
                <SuccessAccessory />
              ) : null}
            </View>
          )}
        </View>

        { !withoutHelp && (
          <View style={isLongText}>
            {error ? (<Text style={styles.errorText}>{error}</Text>) : null}
          </View>
        )}
      </View>
    )
  }
}
