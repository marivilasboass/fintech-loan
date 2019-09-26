import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import { Colors, Button, Text } from '~/UI'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: 'open-sans-light',
    fontSize: 28,
    marginBottom: 10
  },
  description: {
    fontFamily: 'open-sans-regular',
    color: Colors.light,
    fontSize: 20,
    marginBottom: 10
  },
  digitWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    width: null,
    margin: null,
    marginHorizontal: null,
    marginLeft: null,
    marginRight: null
  },
  digit: {
    backgroundColor: Colors.background,
    width: 40,
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  digitText: {
    color: Colors.light,
    fontSize: 24
  },
  inputHidden: {
    height: 50,
    position: 'absolute',
    top: 105,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    color: 'transparent'
  }
})

export default class CreatePassword extends React.PureComponent {
  state = {
    password: ''
  }

  onChange = (password) => {
    this.setState({ password })
  }

  validate = () => {
    return this.state.password.length === 6
  }

  submit = () => {
    if (this.validate()) {
      const { password } = this.state

      this.textInput.blur()

      this.props.submit(password)

      this.setState({ password: '' })

      return true
    }

    return false
  }

  renderDigits () {
    const inputs = []
    const digits = this.state.password.split('')

    for (let i = 0; i < 6; i++) {
      const digit = digits[i] ? this.props.showPassword ? digits[i] : '*' : ''
      inputs.push(
        <View key={i} style={styles.digit}>
          <Text style={styles.digitText} >{digit || ''}</Text>
        </View>
      )
    }

    return inputs
  }

  render () {
    const { style, loading, title, description, submitText, returnKeyType } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.digitWrapper}>
          {this.renderDigits()}
        </View>

        <Button
          large
          loading={loading}
          disabled={!this.validate() || loading}
          title={submitText || 'Próximo passo'}
          onPress={this.submit}
          style={styles.button}
        />

        <TextInput
          style={styles.inputHidden}
          keyboardType='numeric'
          maxLength={6}
          caretHidden
          autoFocus
          secureTextEntry
          value={this.state.password}
          returnKeyType={returnKeyType || 'done'}
          underlineColorAndroid='transparent'
          onChangeText={this.onChange}
          onSubmitEditing={this.submit}
          ref={textInput => { this.textInput = textInput }}
        />
      </View>
    )
  }
}
