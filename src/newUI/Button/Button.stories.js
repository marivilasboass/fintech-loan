import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { View } from '~/newUI'
import { Text } from '~/UI'

import Button from './Button'

storiesOf('Button', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Button title={text('Title', 'Active')} small={boolean('Small', false)} link={boolean('Link', false)} disabled={boolean('Disabled', false)} />
  ))
  .add('loading', () => (
    <Button loading={boolean('Loading', true)} small={boolean('Small', false)} link={boolean('Link', false)} title='Loading' />
  ))
  .add('secondary', () => (
    <Button loading={boolean('Loading', false)} small={boolean('Small', false)} link={boolean('Link', false)} secondary={boolean('Secondary', true)} title='Secondary' />
  ))
  .add('icon', () => (
    <Button title='Próximo' link={boolean('Link', false)} small={boolean('Small', false)} loading={boolean('Loading', false)} secondary={boolean('Secondary', false)} iconRight={{ name: 'arrow-forward', size: 20 }} />
  ))
  .add('kitchen sink', () => (
    <View>
      <Text>Padrão</Text>
      <Button title='Test' />
      <Text>Loading</Text>
      <Button loading />
      <Text>Primary</Text>
      <Button title='Test' primary />
      <Text>Secondary</Text>
      <Button title='Test' secondary />
      <Text>Disabled</Text>
      <Button title='Test' disabled />
      <Text>Link</Text>
      <Button title='Test' link />
      <Text>Link Primary</Text>
      <Button title='Test' link primary />
    </View>
  ))
