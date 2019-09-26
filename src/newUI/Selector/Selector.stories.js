import React, { Component } from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'

import Selector from './Selector'
class SelectorForm extends Component {
  state = { value: this.props.value || '' }
  handleChange = ({ value }) => { this.setState({ value }) }
  render () {
    return this.props.children({ value: this.state.value, onChange: this.handleChange })
  }
}

storiesOf('Selector', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('normal', () => (
    <SelectorForm>{({ value, onChange }) => <Selector value={value} onChange={onChange} label='Banco' data={[{ value: 1, label: 'Bradesco' }, { value: 2, label: 'Santander' }, { value: 3, label: 'Banco Do Brasil' }]} />}</SelectorForm>
  ))
  .add('empty', () => (
    <SelectorForm>{({ value, onChange }) => <Selector value={value} onChange={onChange} />}</SelectorForm>
  ))
  .add('multiple options', () => (
    <SelectorForm>{({ value, onChange }) => <Selector value={value} onChange={onChange} label='Banco' data={[{ value: 1, label: 'Bradesco' }, { value: 2, label: 'Santander' }, { value: 3, label: 'Banco Alfa' }, { value: 4, label: 'Banco BBM' }, { value: 5, label: 'Santander' }, { value: 6, label: 'Banco Do Brasil' }, { value: 7, label: 'Bradesco' }, { value: 8, label: 'Santander' }, { value: 9, label: 'Banco Do Brasil' }, { value: 10, label: 'Bradesco' }, { value: 11, label: 'Santander' }, { value: 12, label: 'Banco Do Brasil' }]} />}</SelectorForm>
  ))
  .add('small max height', () => (
    <SelectorForm>{({ value, onChange }) => <Selector value={value} onChange={onChange} optionsMaxHeight={100} label='Banco' data={[{ value: 1, label: 'Bradesco' }, { value: 2, label: 'Santander' }, { value: 3, label: 'Banco Do Brasil' }]} />}</SelectorForm>
  ))
  .add('large max height', () => (
    <SelectorForm>{({ value, onChange }) => <Selector value={value} onChange={onChange} optionsMaxHeight={800} label='Banco' data={[{ value: 1, label: 'Bradesco' }, { value: 2, label: 'Santander' }, { value: 3, label: 'Banco Do Brasil' }, { value: 4, label: 'Banco Alfa' }, { value: 5, label: 'Banco BBM' }, { value: 6, label: 'Banco Do Brasil' }, { value: 7, label: 'Bradesco' }, { value: 8, label: 'Santander' }, { value: 9, label: 'Banco Do Brasil' }, { value: 10, label: 'Bradesco' }, { value: 11, label: 'Santander' }, { value: 12, label: 'Banco Do Brasil' }]} />}</SelectorForm>
  ))
