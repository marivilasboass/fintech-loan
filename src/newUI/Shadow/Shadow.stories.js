import React, { Component } from 'react'

import { storiesOf } from '@storybook/react-native'

import { View, Text, Touch, Button } from '~/newUI'

import Shadow from './Shadow'

const action = console.log // eslint-disable-line no-console

class DynamicContent extends Component {
  state = { value: 'one line' }

  render () {
    return (
      <View flexDirection='column'>
        <Button
          onPress={() => this.setState(prevState => ({ value: prevState.value + this.props.valueToAdd }))}
          title='Nova Linha'
        />
        <Text style={{ marginTop: 20 }}>{this.state.value}</Text>
      </View>
    )
  }
}

storiesOf('Shadow', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('basic', () => (
    <Shadow width={50} height={50}>
      <Text>Oie</Text>
    </Shadow>
  ))
  .add('custom shadow', () => (
    <Shadow width={200} height={200} x={4} y={4}>
      <Text>Oie</Text>
    </Shadow>
  ))
  .add('rectangular', () => (
    <Shadow width={100} height={50}>
      <Text>Oie</Text>
    </Shadow>
  ))
  .add('circle', () => (
    <Shadow width={60} height={60} radius={30} innerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Oie</Text>
    </Shadow>
  ))
  .add('touchable', () => (
    <Shadow width={100} height={50} x={4} y={4}>
      <Touch onPress={action('touch!')}>
        <View style={{ flex: 1, height: '100%' }}>
          <Text>Toque em mim!</Text>
        </View>
      </Touch>
    </Shadow>
  ))
  .add('touchable circle', () => (
    <Shadow width={60} height={60} radius={30} innerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Touch onPress={action('touch!')}>
        <Text>Tok</Text>
      </Touch>
    </Shadow>
  ))
  .add('layout fillWidth', () => (
    <View>
      <Shadow layout='fillWidth' height={50}>
        <Text>Oie</Text>
      </Shadow>
      <Shadow layout='fillWidth' height={50} outerStyle={{ marginTop: 20, marginRight: 50 }}>
        <Text>Com Margin</Text>
      </Shadow>
    </View>
  ))
  .add('layout fillHeight', () => (
    <View style={{ padding: 20, height: '100%' }}>
      <Shadow layout='fillHeight' width={200}>
        <Text>Oie</Text>
      </Shadow>
    </View>
  ))
  .add('layout fill', () => (
    <View style={{ padding: 20, height: '100%' }}>
      <Shadow layout='fill'>
        <Text>Oie</Text>
      </Shadow>
    </View>
  ))
  .add('layout auto', () => (
    <View style={{ margin: 20, height: 250 }}>
      <Shadow layout='auto'>
        <DynamicContent valueToAdd='Lorem Ipsum' />
      </Shadow>
    </View>
  ))
  .add('layout autoWidth', () => (
    <View style={{ margin: 20 }}>
      <Shadow layout='autoWidth' height={100}>
        <DynamicContent valueToAdd='Lorem Ipsum' />
      </Shadow>
    </View>
  ))
  .add('layout autoHeight', () => (
    <View style={{ margin: 20 }}>
      <Shadow layout='autoHeight' width={100} >
        <DynamicContent valueToAdd='Lorem Ipsum' />
      </Shadow>
    </View>
  ))
  .add('multiple', () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Shadow width={45} height={45} outerStyle={{ marginRight: 7 }}>
        <Text>Oie</Text>
      </Shadow>
      <Shadow width={45} height={45} outerStyle={{ marginRight: 7 }}>
        <Text>Oie</Text>
      </Shadow>
      <Shadow width={45} height={45} outerStyle={{ marginRight: 7 }}>
        <Text>Oie</Text>
      </Shadow>
      <Shadow width={45} height={45} outerStyle={{ marginRight: 7 }}>
        <Text>Oie</Text>
      </Shadow>
    </View>
  ))
