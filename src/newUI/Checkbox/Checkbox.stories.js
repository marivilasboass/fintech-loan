import React, { Component } from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Checkbox from './Checkbox'
class CheckboxForm extends Component {
  state = { value: this.props.value || false }
  handleChange = (value) => { this.setState({ value }) }
  render () {
    return this.props.children({ value: this.state.value, onChange: this.handleChange })
  }
}

storiesOf('Checkbox', module)
  .addDecorator(getStory =>
    <View paddedHorizontally>{getStory()}</View>
  )
  .add('basic', () => (
    <CheckboxForm>{({ value, onChange }) => <Checkbox label='Eu concordo com o Termo e Condições de Uso e Política de privacidade' checked={value} onChange={onChange} /> }</CheckboxForm>
  ))
