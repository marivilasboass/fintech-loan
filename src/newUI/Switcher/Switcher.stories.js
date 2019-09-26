import React, { Component } from 'react'

import { storiesOf } from '@storybook/react-native'

import { View } from '~/newUI'

import Switcher from './Switcher'

class SwitcherWrapper extends Component {
    state = { value: this.props.value || '' }
    handleChange = ({ value }) => { this.setState({ value }) }
    render () {
      return this.props.children({ value: this.state.value, onChange: this.handleChange })
    }
}

const data = { left: { label: 'Conta corrente', value: 'checking' }, right: { label: 'Conta poupança', value: 'savings' } }

storiesOf('Switcher', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('default value', () => (
    <SwitcherWrapper>{({ value, onChange }) => <Switcher {...data} value={value} onChange={onChange} /> }</SwitcherWrapper>
  ))
