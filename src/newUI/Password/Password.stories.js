import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Password from './Password'
class PasswordForm extends Component {
  state = { value: this.props.value || '' }
  handleChange = (value) => { this.setState({ value }) }
  render () {
    return this.props.children({ value: this.state.value, onChange: this.handleChange })
  }
}

storiesOf('Password', module)
  .addDecorator(getStory => (
    <KeyboardAwareScrollView>
      <View paddedHorizontally>{getStory()}</View>
    </KeyboardAwareScrollView>
  )
  )
  .add('empty', () => (
    <PasswordForm>{({ value, onChange }) => <Password value={value} onChange={onChange} /> }</PasswordForm>
  ))
  .add('with value', () => (
    <PasswordForm value='1234'>{({ value, onChange }) => <Password value={value} onChange={onChange} /> }</PasswordForm>
  ))
  .add('with error', () => (
    <PasswordForm value='1234'>{({ value, onChange }) => <Password value={value} onChange={onChange} error='Opa!' /> }</PasswordForm>
  ))
