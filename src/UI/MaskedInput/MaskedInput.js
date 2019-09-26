import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Title from '../Title'
import Text from '../Text'
import Touch from '../Touch'
import Colors from '../Colors'

const styles = StyleSheet.create({
  textInput: {
    display: 'none'
  },
  textContainer: {
    flexDirection: 'row'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    textDecorationLine: 'underline'
  }
})

export default class MaskedInput extends React.Component {
  state = {
    active: false,
    showCursor: false
  }

  componentDidMount () {
    if (this.props.autoFocus) {
      this.setState({ active: true })
    }

    if (this.props.withCursor) {
      this.intervalId = setInterval(() => this.setState({ showCursor: !this.state.showCursor }), 500)
    }
  }

  componentWillUnmount = () => this.intervalId && clearInterval(this.intervalId)

  focus = () => this.textInput && this.textInput.focus()

  blur = () => this.textInput && this.textInput.blur()

  isFocused = () => this.textInput && this.textInput.isFocused()

  onFocus = () => {
    this.setState({ active: true })

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  onBlur = () => {
    this.setState({ active: false })

    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  render () {
    const {
      style, containerStyle,
      size, value, label, formatType,
      formatValue, onChange, onBlur, onFocus, withCursor,
      ...otherProps
    } = this.props
    const { active, showCursor } = this.state

    const stringValue = `${value}`

    const displayedValue = formatValue !== undefined
      ? formatValue(stringValue)
      : stringValue

    return (
      <View style={containerStyle}>
        <Touch onPress={this.focus}>
          <View style={styles.textContainer}>
            {label && (
              <View style={styles.labelContainer}>
                <Text style={styles.label} size={size} light>
                  {label}
                </Text>
                <Text size={size} light>
                  {': '}
                </Text>
              </View>
            )}
            <Title
              size={size}
              bold={active}
              light={!active}
              style={style}
              type={formatType}
            >
              {displayedValue}
              <Title
                size={size}
                light
                style={[style, (!showCursor || !active) && { color: Colors.background }]}
              >
                |
              </Title>
            </Title>
          </View>
        </Touch>

        <TextInput
          style={styles.textInput}
          value={stringValue}
          ref={textInput => { this.textInput = textInput }}
          onChangeText={onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          returnKeyType='done'
          {...otherProps}
        />
      </View>
    )
  }
}
