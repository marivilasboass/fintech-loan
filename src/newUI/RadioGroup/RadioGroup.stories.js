import React, { Component } from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import RadioGroup from './RadioGroup'
class RadioGroupForm extends Component {
  state = { value: this.props.value || '' }
  handleChange = ({ value }) => { this.setState({ value }) }
  render () {
    return this.props.children({ value: this.state.value, onChange: this.handleChange })
  }
}

storiesOf('RadioGroup', module)
  .addDecorator(getStory => (
    <View paddedHorizontally>{getStory()}</View>
  ))
  .add('basic', () => (
    <RadioGroupForm>{({ value, onChange }) => (
      <RadioGroup
        items={[{ value: 'one', label: 'Valor 1' }, { value: 'two', label: 'Valor 2' }, { value: 'three', label: 'LAbel com Um texto Muito Grande que vai estourar' }]}
        value={value}
        onChange={onChange} />
    )}
    </RadioGroupForm>
  ))
